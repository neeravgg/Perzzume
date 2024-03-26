import { Request, Response } from 'express';

interface controller_interface {
    basicController: (req: Request, res: Response) => void;
    image_data: { image_name: string, image_url: string }

}

export { controller_interface }