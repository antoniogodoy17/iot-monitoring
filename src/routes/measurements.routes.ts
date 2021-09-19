import { Router } from 'express';

import MeasurementController from '../controllers/measurement.controller';

const router = Router();

router.post('/', MeasurementController.saveManyMeasurements);

export default router;