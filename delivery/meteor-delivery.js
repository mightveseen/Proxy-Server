import { Router } from 'express';
import { executeApi } from '../repository/meteor-repository.js';
import { getMeteors } from '../use_cases/meteor-use-cases.js';
import CustomException from '../class/CustomException.js';

const router = Router();

router.get('/meteors', async (req, res, next) => {
    try {
        const params = {
            date: req.query.date || new Date().toISOString().split('T')[0],
            count: String(req.query.count).toLowerCase() === 'true',
            isDangerous: req.query['were-dangerous-meteors']
        };
        const response = getMeteors((await executeApi(params)).data, params);
        res.status(200).render('meteor.njk', response);
    } catch (error) {
        next(new CustomException(400, `Error occured during API call [${error}]`));
    }
});

export {router as default};