import { Request, Response } from 'express';
import User from '../../../classes/User';

const signUp = async (req: Request, res: Response) => {
    const { firstName, lastName, email, genre, username, password } = req.body;
    if (firstName !== "" && lastName !== "" && email !== "" && genre !== "" && username !== "" && password !== "") {
        const user = new User(firstName, lastName, email, genre, username, password);
        await user.save(res);
    } else {
        res.json({ message: "insert all the data please" });
    }
};

export default signUp;