import { Router } from 'express';
import { format } from 'date-fns'
import { mapMeteorsToDtoList } from '../use_cases/meteor-mapper.js';
import { mapImageToDto } from '../use_cases/image-mapper.js';
import { getMeteors, getPhotos } from '../repository/nasa-api-client.js';
import { meteorsApiSchema, imageApiSchema } from '../validation/validation-schemas.js'
import validator from '../validation/validation-interceptor.js'
import CustomException from '../class/CustomException.js';

const router = Router();

router.get('/meteors', validator(meteorsApiSchema), async (req, res, next) => {
    try {
        const { date = format(new Date(), 'yyyy-MM-dd'), count = 'false', wereDangerousMeteors = 'all' } = req.query;
        const params = {
            date,
            count: count.toLowerCase() === 'true',
            isDangerous: wereDangerousMeteors === 'all' ? wereDangerousMeteors : wereDangerousMeteors.toLowerCase() === 'true'
        };
        const response = mapMeteorsToDtoList((await getMeteors(params)).data, params);
        res.status(200).render('meteor.njk', response);
    } catch (error) {
        next(new CustomException(error.status, `Error occured during [${req.path}] API call [${error}]`));
    }
});

router.post('/image', validator(imageApiSchema), async (req, res, next) => {
    try {
        const { userId, username, apiKey } = req.body;
        const params = { apiKey };
        const response = mapImageToDto((await getPhotos(params)).data);
        res.status(200).json({ userId: userId, username: username, photo: response })
    } catch (error) {
        next(new CustomException(error.status, `Error occured during [${req.path}] API call [${error}]`));
    }
});

export default router;