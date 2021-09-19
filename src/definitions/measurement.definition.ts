import { Document } from 'mongoose';

export default interface Measurement extends Document {
    parameterId: string;
    value: number;
    status: string;
    sensedTime: number;
    nodeId: string;
};
