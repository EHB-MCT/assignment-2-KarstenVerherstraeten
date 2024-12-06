import axios from "axios";
import cors from "cors";
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
	"mongodb+srv://karstenverherstraeten2:qsedL4vghnLzjIt3@policedata.rjj3l.mongodb.net/?retryWrites=true&w=majority&appName=PoliceData";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		// Connect the client to the server (optional starting in v4.7)
		await client.connect();
		console.log("Connected to MongoDB!");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
}
run().catch(console.dir);

const app = express();
app.use((req, res, next) => {
	console.log("Request Headers:", req.headers);
	console.log("Raw Body:", req.body); // Check if body is parsed
	next();
});
app.use(express.json()); // Parse JSON bodies in requests

app.get("/traffic-data", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.politie.be/statistieken/nl/stats-pol/traffic_chart/content"
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching traffic data" });
  }
});

app.post("/traffic-data/bulk", async (req, res) => {
  try {
  let apiData;

  if (req.body && Object.keys(req.body).length > 0) {
    // Use provided data if a request body exists
    apiData = req.body;
  } else {
    // Fetch data from the external API
    const response = await axios.get(
    "https://www.politie.be/statistieken/nl/stats-pol/traffic_chart/content"
    );
    apiData = response.data;
  }

  // Log fetched API data for debugging
  console.log("Fetched API Data:", apiData);

  // Ensure data is valid
  if (!apiData || typeof apiData !== "object" || !apiData.data) {
    return res
    .status(400)
    .json({ error: "No valid data to process from the API" });
  }

  // Transform data into a list of documents for MongoDB
  const documents = [];

  Object.entries(apiData.data).forEach(([category, values]) => {
    if (Array.isArray(values)) {
    values.forEach(({ x, y0 }) => {
      if (x !== undefined && y0 !== undefined) {
      documents.push({
        category,
        year: x,
        value: y0,
      });
      }
    });
    } else {
    console.warn(
      `Skipping category "${category}" as its data is not an array`
    );
    }
  });

  // If no documents are available to insert, return an error
  if (documents.length === 0) {
    return res.status(400).json({
    error: "No valid data to process. Check the API response or request body.",
    });
  }

  // Insert or update documents in MongoDB
  const db = client.db("traffic-data");
  const collection = db.collection("data");

  const bulkOps = documents.map((doc) => ({
    updateOne: {
    filter: { category: doc.category, year: doc.year },
    update: { $set: { value: doc.value } },
    upsert: true,
    },
  }));

  const result = await collection.bulkWrite(bulkOps);

  res.status(200).json({
    success: true,
    message: "Data has been successfully upserted.",
    matchedCount: result.matchedCount,
    modifiedCount: result.modifiedCount,
    upsertedCount: result.upsertedCount,
  });
  } catch (error) {
  console.error("Error processing bulk data:", error);
  res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
