import axios from "axios";
import cors from "cors";
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import postPoliceData from "./police-endpoins/post-PoliceData.js";
import GetPoliceData from "./police-endpoins/get-PoliceData.js";





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

postPoliceData(app, client);
GetPoliceData(app, client);
app.use((req, res, next) => {
	console.log("Request Headers:", req.headers);
	console.log("Raw Body:", req.body); // Check if body is parsed
	next();
});
app.use(express.json()); // Parse JSON bodies in requests





const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
