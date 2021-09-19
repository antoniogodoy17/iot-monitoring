import { Schema, model } from 'mongoose';

import Measurement from '../definitions/measurement.definition';

const measurementSchema = new Schema({
    parameterId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    sensedTime: {
        type: Number,
        required: true,
    },
    nodeId: {
        type: Schema.Types.ObjectId,
        required: true,
    }
});

const measurement = model<Measurement>('Measurement', measurementSchema);

export default measurement;