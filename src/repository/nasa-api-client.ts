import { env } from "../config/config.ts";
import axios from "axios";

export async function getMeteors(date: string) {
    return axios.get(env.nasaMeteorApi, {
        params: {
            start_date: date,
            end_date: date,
            api_key: env.apiKey,
        },
    });
}

export async function getPhotos(apiKey: string) {
    return axios.get(env.nasaRoverApi, {
        params: {
            sol: env.sol,
            api_key: apiKey,
        },
    });
}