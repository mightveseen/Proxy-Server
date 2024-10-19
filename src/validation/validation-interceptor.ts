import { CustomSchema } from './validation-schemas.ts'
import { NextFunction, Request, Response } from 'express';
import CustomException from '../class/CustomException.ts';

const validator = (schema: CustomSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const { query, body } = req;
        const queryValidation = schema.query?.validate(query).error;
        const bodyValidation = schema.body?.validate(body).error;
        if (queryValidation || bodyValidation) {
            next(new CustomException(400, `Error occured during validation. Query [${queryValidation || 'none'}], body [${bodyValidation || 'none'}]`));
        }
        next();
    };
};

export default validator;