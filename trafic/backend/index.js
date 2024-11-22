import axios from 'axios';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());

app.get('/traffic-data', async (req, res) => {
    try {
       
        const response = await axios.get('https://www.politie.be/statistieken/nl/stats-pol/traffic_chart/content');
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching traffic data' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});