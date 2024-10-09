import dotenv from 'dotenv';
import express from 'express';
import meteorDelivery from './delivery/meteor-delivery.js'

const app = express();
const port = process.env.SERVER_PORT || 4000;

dotenv.config();

app.use(meteorDelivery);

app.listen(port, () => {
    console.log(`Server is running on port ${port} ...`);
});