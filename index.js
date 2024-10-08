import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

async function getApiData(startDate, endDate) {
    const apiUrl = `${process.env.API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.API_KEY}`;
    return axios.get(apiUrl);
}

function filterResponse(data) {
    let result = [];
    Object.values(data['near_earth_objects']).forEach(date => {
        date.forEach(meteor => {
            result.push({
                id : meteor['id'],
                name : meteor['name'],
                diameter: meteor['estimated_diameter']['meters'],
                is_potentially_hazardous_asteroid: meteor['is_potentially_hazardous_asteroid'],
                close_approach_date_full: meteor['close_approach_data'][0]['close_approach_date_full'],
                relative_velocity: meteor['close_approach_data'][0]['relative_velocity']['kilometers_per_second'],
            });
        });
    });
    return result;
}

app.get('/api/meteors', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const response = filterResponse((await getApiData(startDate, endDate)).data);
        res.status(200).json(response);
    } catch (error) {
        const message = `Error occured during API call [${error}]`;
        console.error(message);
        res.status(400).json({ message });
    }
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT} ...`);
});