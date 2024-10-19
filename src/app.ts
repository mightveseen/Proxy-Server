import { env } from "./config/config.js";
import { Response, Request, NextFunction } from 'express';
import nunjucks from 'nunjucks';
import express, { Application } from 'express';
import meteorController from './delivery/meteor-controller.js';
import CustomException from "./class/CustomException.ts";

const app: Application = express();

/* MIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* CONTROLLER */
app.use(meteorController);

/* ERROR HANDLER */
app.use((error: CustomException, _req: Request, res: Response, _next: NextFunction) => {
    const { code = 500, message } = error;
    res.status(code).render('exception.njk', { message: message });
})

app.listen(env.port, () => {
    console.log(`Server is running on port ${env.port} ...`);
});

nunjucks.configure('views', {
    autoescape: true,
    express: app
})