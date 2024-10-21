import Joi from 'joi';
import { Schema } from '../class/ValidationSchema';

export const meteorsApiSchema: Schema = {
    query: Joi.object({
        date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
        count: Joi.boolean().optional(),
        'were-dangerous-meteors': Joi.boolean().optional()
    })
};

export const imageApiSchema: Schema = {
    body: Joi.object({
        userId: Joi.string().guid().required(),
        username: Joi.string().required(),
        apiKey: Joi.string().required()
    })
};