import { Request, Response } from 'express';
import User from '../../../classes/User';



const login = async (req: Request, res: Response)=>
{
    const { email, password } = req.body;
    if (email !== "" && password !== "") {
        const user = new User("", "", email, "", "", password);
        await user.login(res);
    } else {
        res.json({ message: "insert all the data please" });
    }
};


export default login