import { Request, Response } from 'express';
import { media } from '../../../classes/media';


async function findUnique(req: Request | any, res: Response) 
{
    const {mediaId} = req.params
    if(mediaId){
        await media.findById(res, mediaId);
    }else{
        res.status(404).json({message:"insert the mediaId"})
    }
    
}

export default findUnique;
