import CustomException from '../class/CustomException.js';

const validator = (schema) => {
    return (req, _res, next) => {
        const queryValidation = schema.query?.validate(req.query).error;
        const bodyValidation = schema.body?.validate(req.body).error;
        if (queryValidation || bodyValidation) {
            next(new CustomException(400, `Error occured during validation. Query [${queryValidation || 'none'}], body [${bodyValidation || 'none'}]`));
        }
        next();
    };
};

export default validator;