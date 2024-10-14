import { env } from "../config/config.js";
import axios from "axios";

export async function getMeteors(params) {
    return axios.get(env.nasaMeteorApi, {
        params: {
            start_date: params.date,
            end_date: params.date,
            api_key: env.apiKey,
        },
    });
}

export async function getPhotos(params) {
    return axios.get(env.nasaRoverApi, {
        params: {
            sol: env.sol,
            api_key: params.apiKey,
        },
    });
}