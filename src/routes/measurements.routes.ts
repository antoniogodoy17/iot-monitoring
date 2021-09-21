import { Router } from 'express';

import MeasurementController from '../controllers/measurement.controller';

const router = Router();

router.get('/', MeasurementController.getMeasurements);

router.post('/', MeasurementController.saveMeasurement);

export default router;