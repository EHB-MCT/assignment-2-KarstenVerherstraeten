export default function GetPoliceData(app, client) {
    app.get("/traffic-data", async (req, res) => {
      try {
        // Connect to the database
        const database = client.db("traffic-data"); // Replace with your database name
        const collection = database.collection("data"); // Replace with your collection name
  
        // Fetch all documents from the collection
        const trafficData = await collection.find({}).toArray();
  
        // Send the data back as JSON
        res.status(200).json(trafficData);
      } catch (error) {
        console.error("Error fetching traffic data:", error);
        res.status(500).json({ error: "Error fetching traffic data" });
      }
    });
  }