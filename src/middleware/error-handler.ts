import { Response, Request, NextFunction } from 'express';
import CustomException from "../class/CustomException";

const errorHandler = (error: CustomException, _req: Request, res: Response, _next: NextFunction) => {
    const { code = 500, message } = error;
    res.status(code).render('exception.njk', { message: message });
}

export default errorHandler;