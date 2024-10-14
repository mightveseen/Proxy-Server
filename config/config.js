import { config } from 'dotenv';

config();

export const env = {
    port: process.env.SERVER_PORT || 4000,
    nasaMeteorApi: process.env.NASA_METEOR_API,
    nasaRoverApi: process.env.NASA_ROVER_API,
    apiKey: process.env.API_KEY,
    sol: process.env.SOL
};