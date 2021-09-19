import { Response } from 'express';

import QueryResult from '../definitions/queryResult.definition';

const httpError = (res: Response, error: any) => {
    console.log(error);
    const result: QueryResult = { message: 'Something went wrong', data: {}, statusCode: 500 };

    return res.status(500).send(result);
}

export default httpError;