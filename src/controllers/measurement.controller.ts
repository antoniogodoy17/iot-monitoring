import { Request, Response, NextFunction } from 'express';

import Measurement from '../definitions/measurement.definition';
import QueryResult from '../definitions/queryResult.definition';

import MeasurementModel from '../models/measurement.model';
import errorHandler from '../helpers/errorHandler';

export default class MeasurementController {

    constructor() {}

    static getMeasurements = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let result: QueryResult;

            const measurements: Measurement[] = await MeasurementModel.find();
    
            result = { message: 'Measurements successfully retrieved from DB.', data: { measurements }, statusCode: 201 };
            
            return res.status(201).send(result);
        } catch (error: any) {
            errorHandler(res, error);
        }
    }

    static saveMeasurement = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let result: QueryResult;

            if (req.body.measurement) {
                const now = Date.now();
                const measurement: Measurement = new MeasurementModel(req.body.measurement);
                measurement.sensedTime = now;
                
                await measurement.save();
    
                result = { message: 'Measurements successfully saved in DB.', data: { measurement }, statusCode: 201 };
                
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