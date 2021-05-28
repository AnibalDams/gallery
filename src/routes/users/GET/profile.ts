import { Request, Response } from "express";
import { user } from "../../../classes/User";

const profile = async (req: Request | any, res: Response) => {
    const userId = req.user._id;
    if (userId) {
        await user.getProfile(res, userId);
    } else {
        res.status(400).json({ message: "Id not provided" });
    }
};

export default profile;
