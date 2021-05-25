import { Request, Response } from 'express';
import Media from '../../../classes/media';

async function upload(req: Request | any, res: Response) {

    if (
        req.file.mimetype === "image/jpeg"
        || req.file.mimetype === "image/png"
        || req.file.mimetype === "image/jpeg"
        || req.file.mimetype === "image/gif"
        || req.file.mimetype === "video/mp4"

    ) {
        console.log(req.file);
        const kilobytes = req.file.size * (1.0 / 1024);
        const megabytes = kilobytes * (1.0 / 1024);
        const media = new Media(req.file.path, req.file.mimetype, megabytes);
        await media.save(res, req.user.email);
    } else {
        res.json({ message: "type not supported" });
    }
}

export default upload;