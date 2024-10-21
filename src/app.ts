import { env } from "./config/config.js";
import errorHandler from './middleware/error-handler.ts';
import nunjucks from 'nunjucks';
import express, { Application } from 'express';
import meteorRouter from './router/meteor-router.ts';

const app: Application = express();

/* MIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

/* ROUTER */
app.use(meteorRouter);

/* SERVER CONFIGURATION */
app.listen(env.port, () => {
    console.log(`Server is running on port [${env.port}]...`);
});

nunjucks.configure('views', {
    autoescape: true,
    express: app
})