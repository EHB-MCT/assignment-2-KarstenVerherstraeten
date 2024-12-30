import axios from "axios"; // Import Axios for HTTP requests

// Define a new endpoint for POST requests to insert or update bulk data
export default function postPoliceData(app, client) {
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
					error:
						"No valid data to process. Check the API response or request body.",
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

			// Return a success message with the number of documents processed
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
}
