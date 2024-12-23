import express from "express"; // Import the express library to create a server.
import { MongoClient, ServerApiVersion } from "mongodb"; // Import the MongoClient and ServerApiVersion objects from the mongodb library.

// Import the function from the file that contains the endpoint.
import postPoliceData from "./police-endpoins/post-PoliceData.js";
import GetPoliceData from "./police-endpoins/get-PoliceData.js";

const uri =
	"mongodb+srv://karstenverherstraeten2:GFte5EOhRGpvh0Ns@policedata.rjj3l.mongodb.net/?retryWrites=true&w=majority&appName=PoliceData";

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
		// Connect the client to the database
		await client.connect();
		console.log("Connected to MongoDB!");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
}
run().catch(console.dir);

const app = express();

// Call the function with the app and client objects
postPoliceData(app, client);
GetPoliceData(app, client);

// Middleware to log request headers and body
app.use((req, res, next) => {
	console.log("Request Headers:", req.headers);
	console.log("Raw Body:", req.body); // Check if body is parsed
	next();
});
app.use(express.json()); // Parse JSON bodies in requests

// Middleware to log the request method and URL
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
