import { Request, Response, NextFunction } from 'express';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import User from '../definitions/user.definition';
import QueryResult from '../definitions/queryResult.definition';
import UserModel from '../models/user.model';
import errorHandler from '../helpers/errorHandler';

export default class AuthController {

    constructor() {}

    static login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const foundUser: (User | null) = await UserModel.findOne({ email }); 
            
            if (!foundUser) {
                return res.status(401).send({ message: 'Could not log you in.', data: {}, statusCode: 401 });
            }
            
            const passMatches = await compare(password, foundUser.password);
            
            if (!passMatches) {
                return res.status(401).send({ message: 'Could not log you in.', data: {}, statusCode: 401 });
            }
            
            const data = { uid: foundUser._id, email: foundUser.email };
            const token = sign(data, process.env.JWT_SECRET!, { expiresIn: '1h' });
            const result: QueryResult = { message: 'Logged in successfully.', data: { token }, statusCode: 200 };
            
            return res.status(200).send(result);
        }
        catch(error: any) {
            errorHandler(res, error);
        }
    }

    static signup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const hashed = await hash(password, 12); 

            const newUser: User = new UserModel({ email, password: hashed });

            await newUser.save();

            return res.send(newUser);
        }
        catch(error: any) {
            errorHandler(res, error);
        }
    }
}