import { NextFunction, Response, Request } from 'express';
import { format } from 'date-fns'
import { mapMeteorsToDtoList } from '../use_cases/meteor-mapper.ts';
import { mapImageToDto } from '../use_cases/image-mapper.ts';
import { executeRoverAPI, executeNeoAPI } from '../repository/nasa-api-client.ts';
import { getBooleanValue } from '../utility/type-extractor.ts';
import CustomException from '../class/CustomException.ts';

export const getMeteor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date = format(new Date(), 'yyyy-MM-dd'), count = 'false', wereDangerousMeteors = 'all' } = req.query;
        const params = {
            date: date as string,
            count: getBooleanValue(count),
            isDangerous: wereDangerousMeteors === 'all' ? wereDangerousMeteors : getBooleanValue(wereDangerousMeteors)
        };
        const result = await executeNeoAPI(params.date)
        const response = await mapMeteorsToDtoList(result.data, params);
        res.status(200).render('meteor.njk', response);
    } catch (error) {
        next(new CustomException(400, `Error occured during [${req.path}] API call [${error}]`));
    }
};

export const getImage = (_req: Request, res: Response) => {
    res.status(200).render("rover-request.njk");
};

export const postImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, username, apiKey } = req.body;
        const result = await executeRoverAPI(apiKey);
        const response = await mapImageToDto(result.data);
        res.status(200).render('rover.njk', { userId: userId, username: username, photo: response })
    } catch (error) {
        next(new CustomException(400, `Error occured during [${req.path}] API call [${error}]`));
    }
};