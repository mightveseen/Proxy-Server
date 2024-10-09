import { Router } from 'express';
import { getApiData } from '../repository/meteorRepository.js';
import { filterResponse } from '../useCases/meteorUseCases.js';

const router = Router();

router.get('/api/meteors', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const response = filterResponse((await getApiData(startDate, endDate)).data);
        res.status(200).json(response);
    } catch (error) {
        const message = `Error occured during API call [${error}]`;
        console.error(message);
        res.status(400).json({ message });
    }
});

export default router;