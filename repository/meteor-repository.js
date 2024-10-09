import axios from "axios";

export async function executeApi(params) {
    const apiUrl = `${process.env.API_URL}?`
        + `start_date=${params.date}&`
        + `end_date=${params.date}&`
        + `api_key=${process.env.API_KEY}`;
    return axios.get(apiUrl);
}