import { NextFunction } from 'express';
import { middlewareInterface } from '../types/middleware.interface';

const wrapper: middlewareInterface['wrapper'] = (cb, options, update = false) => {
    // Provide custom resize options
    return (req: Request, res: Response, next: NextFunction) =>
        cb(options, req, res, next, update);



}
export default wrapper