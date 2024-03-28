import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';

type dataByUserUnion = 'about' | 'experience' | 'skill' | 'project'
interface middlewareInterface {
    generic: (req: Request, res: Response, next: NextFunction) => void;
    authenticate: (req: Request, res: Response, next: NextFunction) => void;
    authenticationCheck: (req: Request, res: Response, next: NextFunction) => void;
    uploadWrapper: (cb: (...args: any[]) => any, options: Record<any, any>, update?: boolean) => any;
    uploadImage: (resizeOptions: sharp.ResizeOptions, req: Request, res: Response, next: NextFunction, update?: boolean) => void;
    dataByUserWrapper: (cb: (...args: any[]) => any, modal: string) => any;
    dataByUser: (modal: dataByUserUnion, req: Request, res: Response, next: NextFunction) => void;
    deleteImage: (req: Request, res: Response, next: NextFunction) => void;
}


export { middlewareInterface }