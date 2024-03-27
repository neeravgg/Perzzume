import { Request, Response, NextFunction } from 'express';

interface localsInterface {
    decoded_user: {
        id: number,
        iat: number,
        export: number
    }
}


export { localsInterface }