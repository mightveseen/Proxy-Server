import Joi, { ObjectSchema } from 'joi';

export interface CustomSchema {
    query?: ObjectSchema,
    body?: ObjectSchema
}

export const meteorsApiSchema: CustomSchema = {
    query: Joi.object({
        date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional(),
        count: Joi.boolean().optional(),
        'were-dangerous-meteors': Joi.boolean().optional()
    })
};

export const imageApiSchema: CustomSchema = {
    body: Joi.object({
        userId: Joi.string().guid().required(),
        username: Joi.string().required(),
        apiKey: Joi.string().required()
    })
};