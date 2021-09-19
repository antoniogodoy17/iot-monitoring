import { Request, Response, NextFunction } from 'express';

import Measurement from '../definitions/measurement.definition';
import QueryResult from '../definitions/queryResult.definition';

import MeasurementModel from '../models/measurement.model';
import errorHandler from '../helpers/errorHandler';
import measurement from '../models/measurement.model';

export default class MeasurementController {

    constructor() {}
    
    static saveManyMeasurements = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let result: QueryResult;

            if (req.body.measurements) {
                const measurements: Measurement[] = req.body.measurements.map((m: Measurement) => {
                    const now = Date.now();

                    return { ...m, sensedTime: now };
                });
                
                await MeasurementModel.insertMany(measurements);
    
                result = { message: 'Measurements successfully saved in DB.', data: {}, statusCode: 201 };
                
                return res.status(201).send(result);
            }
            result = { message: 'No measurements received.', data: {}, statusCode: 400 };
            return res.status(400).send(result);
        }
        catch(error: any) {
            errorHandler(res, error);
        }        
    }
}