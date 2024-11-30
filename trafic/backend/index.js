import axios from 'axios';
import cors from 'cors';
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://karstenverherstraeten2:qsedL4vghnLzjIt3@policedata.rjj3l.mongodb.net/?retryWrites=true&w=majority&appName=PoliceData";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
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
    console.log('Request Headers:', req.headers);
    console.log('Raw Body:', req.body); // Check if body is parsed
    next();
});
app.use(express.json());  // Parse JSON bodies in requests

app.get('/traffic-data', async (req, res) => {
  try {
    const response = await axios.get('https://www.politie.be/statistieken/nl/stats-pol/traffic_chart/content');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching traffic data' });
  }
});


app.post('/traffic-data', async (req, res) => {
    try {
        console.log('Received body:', req.body); // Inspect received body

        // If incoming data has the expected "data" object
        const incomingData = req.body.data;
        if (!incomingData || typeof incomingData !== 'object') {
            return res.status(400).json({ error: 'Invalid or missing "data" field in request body' });
        }

        // Check if we have data coming from the external API
        const trafficDataFromAPI = await axios.get('https://www.politie.be/statistieken/nl/stats-pol/traffic_chart/content');
        const apiData = trafficDataFromAPI.data;

        // Check if API data exists
        if (!apiData || typeof apiData !== 'object') {
            return res.status(400).json({ error: 'No valid data received from the API' });
        }

        // Transform the API data into documents for MongoDB (example transformation)
        const documents = Object.entries(apiData).map(([category, data]) => ({
            category, // Category name from API
            data,     // Corresponding data from API
        }));

        const db = client.db('traffic-data'); // Database name
        const collection = db.collection('data'); // Collection name

        // Insert the documents into MongoDB
        const result = await collection.insertMany(documents);

        // Respond with success and the number of documents inserted
        res.status(200).json({
            success: true,
            insertedCount: result.insertedCount,
        });
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        res.status(500).json({ error: 'Failed to insert data into MongoDB' });
    }
});
  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});