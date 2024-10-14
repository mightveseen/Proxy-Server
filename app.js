import { env } from "./config/config.js";
import nunjucks from 'nunjucks';
import express from 'express';
import meteorController from './delivery/meteor-controller.js';

const app = express();

nunjucks.configure('views', {
    express: app
})

app.use(express.json());
app.use(meteorController);
app.use((error, _req, res, _next) => {
    res.status(error.code || 500).render('exception.njk', { message: error.message });
})

app.listen(env.port, error => {
    error ? console.log(error) : console.log(`Server is running on port ${env.port} ...`);
});