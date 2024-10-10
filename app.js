import nunjucks from 'nunjucks';
import express from 'express';
import meteorController from './delivery/meteor-controller.js';
import { env } from "./config/config.js";

const app = express();

nunjucks.configure('views', {
    express: app
})

app.use(meteorController);
app.use((error, _req, res, _next) => {
    res.status(error.code || 500).render('exception.njk', { message: error.message });
})

app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port} ...`);
});