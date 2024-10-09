import { Router } from 'express';
import { executeApi } from '../repository/meteor-repository.js';
import { getMeteors } from '../use_cases/meteor-use-cases.js';

const router = Router();

router.get('/api/meteors', async (req, res) => {
    try {
        const params = {
            date: req.query.date || new Date().toISOString().split('T')[0],
            count: req.query.count || -1,
            isDangerous: req.query['were-dangerous-meteors'] === 'true' || undefined
        };
        const response = getMeteors((await executeApi(params)).data, params);
        res.status(200).json(response);
    } catch (error) {
        const message = `Error occured during API call [${error}]`;
        console.error(message);
        res.status(400).json({ message });
    }
});

export {router as default};