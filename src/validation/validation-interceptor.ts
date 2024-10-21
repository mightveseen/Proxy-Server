import { Schema } from '../class/ValidationSchema.ts'
import { NextFunction, Request, Response } from 'express';
import CustomException from '../class/CustomException.ts';

const validator = (schema: Schema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const { query, body } = req;
        const queryValidation = schema.query?.validate(query).error;
        const bodyValidation = schema.body?.validate(body).error;
        if (queryValidation || bodyValidation) {
            const message = queryValidation ? `Query [${queryValidation}]` : `Body [${bodyValidation}]`;
            next(new CustomException(400, `Error occured during validation. ${message}`));
        }
        next();
    };
};

export default validator;