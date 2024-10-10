import { Router } from 'express';
import { executeApi } from '../repository/meteor-client.js';
import { getMeteors } from '../use_cases/meteor-mapper.js';
import { format } from 'date-fns'
import CustomException from '../class/CustomException.js';

const router = Router();

router.get('/meteors', async (req, res, next) => {
    try {
        const { date = format(new Date(), 'yyyy-MM-dd'), count = 'false', wereDangerousMeteors = 'all' } = req.query;
        const params = { 
            date,
            count: count.toLowerCase() === 'true',
            isDangerous: wereDangerousMeteors === 'all' ? wereDangerousMeteors : wereDangerousMeteors.toLowerCase() === 'true'
        };
        const response = getMeteors((await executeApi(params)).data, params);
        res.status(200).render('meteor.njk', response);
    } catch (error) {
        next(new CustomException(400, `Error occured during API call [${error}]`));
    }
});

export default router;