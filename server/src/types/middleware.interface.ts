import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';

interface middlewareInterface {
    authenticate: (req: Request, res: Response, next: NextFunction) => void;
    authenticationCheck: (req: Request, res: Response, next: NextFunction) => void;
    uploadImage: (resizeOptions: sharp.ResizeOptions, req: Request, res: Response, next: NextFunction) => void;
    deleteImage: (req: Request, res: Response, next: NextFunction) => void;

}


export { middlewareInterface }