import { Request, Response } from "express";
import { user } from "../../../classes/User";

const UpdateAvatar = async (req: Request | any, res: Response) => {
    const imagePath = req.file.path;
    const userId = req.user._id;
    await user.updateAvatar(res, userId, imagePath);
};



export default UpdateAvatar
