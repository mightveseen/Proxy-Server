import { config } from 'dotenv';
import nunjucks from 'nunjucks';
import express from 'express';
import meteorDelivery from './delivery/meteor-delivery.js';

const app = express();
const port = process.env.SERVER_PORT || 4000;

config();
nunjucks.configure('views', {
    express: app
})

app.use(meteorDelivery);
app.use((error, _req, res, _next) => {
    res.status(error.code || 500).render('exception.njk', { message: error.message });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port} ...`);
});