import { media } from '../../../classes/media';
import { Request, Response } from 'express';

const Delete = async (req: Request, res: Response) => {
    const { mediaId } = req.params;

    if (mediaId) {
        await media.delete(res, mediaId);
    } else {
        res.status(404).json({ message: "media id not founded" });
    }
};

export default Delete;