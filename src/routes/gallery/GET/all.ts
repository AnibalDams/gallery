import { Request, Response } from 'express';
import { media } from '../../../classes/media';


async function all(req: Request | any, res: Response) 
{
    
    await media.find(res, req.user.email);
}

export default all;
