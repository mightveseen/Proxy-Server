import axios from "axios";

export async function executeApi(params) {
    return axios.get(process.env.API_URL, {
        params: {
            start_date: params.date,
            end_date: params.date,
            api_key: process.env.API_KEY
        }
    });
}