import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

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

getApiData();