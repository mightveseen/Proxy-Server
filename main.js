import dotenv from 'dotenv';
import express from 'express';
import meteorDelivery from './delivery/meteorDelivery.js'

dotenv.config();

const app = express();

app.use(meteorDelivery)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT} ...`);
});