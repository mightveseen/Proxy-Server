import axios from "axios";
import { env } from '../config/config.js'

export async function executeApi(params) {
    return axios.get(env.apiUrl, {
        params: {
            start_date: params.date,
            end_date: params.date,
            api_key: env.apiKey
        }
    });
}