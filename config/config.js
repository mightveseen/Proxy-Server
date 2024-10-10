import { config } from 'dotenv';

config();

export const env = {
    port: process.env.SERVER_PORT || 4000,
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY
};