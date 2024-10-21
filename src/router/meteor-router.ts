import { Router } from 'express';
import { meteorsApiSchema, imageApiSchema } from '../validation/validation-schemas.ts'
import { getImage, getMeteor, postImage } from '../delivery/meteor-controller.ts'
import validator from '../validation/validation-interceptor.ts'

const router = Router();

router.get('/meteors', validator(meteorsApiSchema), getMeteor);
router.get("/image", getImage)
router.post('/image', validator(imageApiSchema), postImage);

export default router;