import { ObjectSchema } from 'joi';

export interface Schema {
    query?: ObjectSchema,
    body?: ObjectSchema
}