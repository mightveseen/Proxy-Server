import { config } from 'dotenv';

config();

interface Configuration {
    port: number,
    nasaMeteorApi: string,
    nasaRoverApi: string,
    apiKey: string,
    sol: number
}

export const env: Configuration = {
    port: parseInt(process.env.SERVER_PORT!) || 4000,
    nasaMeteorApi: process.env.NASA_METEOR_API!,
    nasaRoverApi: process.env.NASA_ROVER_API!,
    apiKey: process.env.API_KEY!,
    sol: parseInt(process.env.SOL!)
};