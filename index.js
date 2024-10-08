import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

const now = new Date();
const date = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
const apiUrl = `${process.env.API_URL}?start_date=${date}&end_date=${date}&api_key=${process.env.API_KEY}`;

function getApiData() {
    axios.get(apiUrl)
        .then(response => {
            console.log(JSON.stringify(response.data, 0, 1));
        }).catch(error => {
            console.error(`Error occurred during API call [${error}]`);
        })
}

app.listen(4000, () => {
    console.log(`Server is running on port ${4000}...`);
});