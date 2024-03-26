import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';

interface middlewareInterface {
    generic: (req: Request, res: Response, next: NextFunction) => void;
    authenticate: (req: Request, res: Response, next: NextFunction) => void;
    wrapper: (cb: (...args: any[]) => any, options: Record<any, any>, update?: boolean) => any;
    authenticationCheck: (req: Request, res: Response, next: NextFunction) => void;
    uploadImage: (resizeOptions: sharp.ResizeOptions, req: Request, res: Response, next: NextFunction, update?: boolean,) => void;
    deleteImage: (req: Request, res: Response, next: NextFunction) => void;
    decoded_user: {
        id: number,
        iat: number,
        export: number
    }
}


export { middlewareInterface }