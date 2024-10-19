import { NextFunction, Router, Response, Request } from 'express';
import { format } from 'date-fns'
import { mapMeteorsToDtoList } from '../use_cases/meteor-mapper.ts';
import { mapImageToDto } from '../use_cases/image-mapper.ts';
import { getPhotos, getMeteors } from '../repository/nasa-api-client.ts';
import { meteorsApiSchema, imageApiSchema } from '../validation/validation-schemas.ts'
import validator from '../validation/validation-interceptor.ts'
import CustomException from '../class/CustomException.ts';

const router = Router();

router.get('/meteors', validator(meteorsApiSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date = format(new Date(), 'yyyy-MM-dd'), count = 'false', wereDangerousMeteors = 'all' } = req.query;
        const params = {
            date: date as string,
            count: (count as string).toLowerCase() === 'true',
            isDangerous: wereDangerousMeteors === 'all' ? wereDangerousMeteors : (wereDangerousMeteors as string).toLowerCase() === 'true'
        };
        const response = await mapMeteorsToDtoList((await getMeteors(params.date)).data, params);
        res.status(200).render('meteor.njk', response);
    } catch (error) {
        next(new CustomException(400, `Error occured during [${req.path}] API call [${error}]`));
    }
});

router.get("/image", (_req: Request, res: Response) => {
    res.status(200).render("rover-request.njk");
})

router.post('/image', validator(imageApiSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, username, apiKey } = req.body;
        const response = await mapImageToDto((await getPhotos(apiKey)).data);
        res.status(200).render('rover.njk', { userId: userId, username: username, photo: response })
    } catch (error) {
        next(new CustomException(400, `Error occured during [${req.path}] API call [${error}]`));
    }
});

export default router;