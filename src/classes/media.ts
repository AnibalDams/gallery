import { Response } from "express";
import cloudinary from "cloudinary";
import MediaM from "../models/mediaModel";

interface Imedia {
    find(res: Response, userEmail: string): Promise<void>;
    findById(res: Response, id: string): Promise<void>;
    delete(res: Response, id: string): Promise<void>;
}

export const media: Imedia = {
    async find(res: Response, userEmail: string) {
        try {
            const mediaFind = await MediaM.find({ userEmail: userEmail });
            if (mediaFind.length > 0) {
                res.json({ data: mediaFind });
            } else {
                res.json({ message: "Not media found" });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "and error was occurred" });
        }
    },
    async findById(res: Response, id: string) {
        try {
            const mediaFind = await MediaM.findById(id);
            if (mediaFind) {
                res.json({ data: mediaFind });
            } else {
                res.json({ message: "not media found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "an error was occured" });
        }
    },
    async delete(res: Response, id: string) {
        try {
            const media: any = await MediaM.findById(id);
            if (media) {
                await cloudinary.v2.uploader.destroy(media.cloudinaryId);
                await MediaM.findByIdAndDelete(id);
                res.json({ message: `media ${id} deleted` });
            } else {
                res.status(404).json({ message: "media not found" });
            }
        } catch (e) {
            console.log(e);
            res.json({ message: "an error was occured" });
        }
    },
};

class Media {
    path: string;
    type: string;
    size: number;

    constructor(path: string, type: string, size: number) {
        this.path = path;
        this.type = type;
        this.size = size;
    }

    async save(res: Response, userEmail: string) {
        try {
            const uploadImageToCloudinary = await cloudinary.v2.uploader.upload(
                this.path
            );
            const imageUrl = uploadImageToCloudinary.url;
            const public_cloudinaryId = uploadImageToCloudinary.public_id;

            const media = new MediaM({
                url: imageUrl,
                type: this.type,
                size: this.size,
                cloudinaryId: public_cloudinaryId,
                userEmail: userEmail,
            });
            await media.save();
            res.json({ data: media });
        } catch (e) {
            console.error(e);
            res.json({ message: "An error was occured" });
        }
    }
}

export default Media;
