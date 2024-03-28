import { NextFunction } from 'express';
import { middlewareInterface } from '../types/middleware.interface';

const uploadWrapper: middlewareInterface['uploadWrapper'] = (cb, options, update = false) => {
    // Provide custom resize options
    return (req: Request, res: Response, next: NextFunction) =>
        cb(options, req, res, next, update);
}

const dataByUserWrapper: middlewareInterface['dataByUserWrapper'] = (cb, modal) => {
    // Provide custom resize options
    return (req: Request, res: Response, next: NextFunction) =>
        cb(modal, req, res, next);
}
export { uploadWrapper, dataByUserWrapper }