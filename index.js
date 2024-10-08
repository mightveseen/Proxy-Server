import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

async function getApiData(startDate, endDate) {
    const apiUrl = `${process.env.API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.API_KEY}`;
    return axios.get(apiUrl);
}

app.get('/api/meteors', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        res.status(200).json((await getApiData(startDate, endDate)).data);
    } catch (error) {
        const message = `Error occured during API call [${error}]`;
        console.error(message)
        res.status(400).json({message})
    }
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT} ...`);
});