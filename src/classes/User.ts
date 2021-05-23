import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { Response } from 'express';
import { Encrypt, DescryptAndCompare } from '../utils/encrypter';
class UserClass {
    firstName: string;
    lastName: string;
    email: string;
    genre: string;
    username: string;
    password: string;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        genre: string,
        username: string,
        password: string
    ) {
        this.firstName = firstName || "";
        this.lastName = lastName || "";
        this.email = email;
        this.genre = genre || "";
        this.username = username || "";


        this.password = password;
    }

    async save(res: Response) {
        const {
            firstName,
            lastName,
            email,
            genre,
            username,
            password,
        } = this;

        const EncryptedPassword = Encrypt(password, process.env.ENCRYPT_KEY);


        const user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            genre: genre,
            username: username,
            avatar:
                genre === "Male"
                    ? "https://res.cloudinary.com/dfj3oghor/image/upload/v1619988853/avatarDefaultMale_zgjlsw.jpg"
                    : "https://res.cloudinary.com/dfj3oghor/image/upload/v1619988848/avatarDefaultFemale_feyd97.jpg",
            password: EncryptedPassword,
        });

        const usernameFind = await User.find({
            username: this.username,
        });
        const emailFind = await User.find({
            email: this.email,
        });
        if (emailFind.length > 0) {
            res.json({ message: "Email already in use" });
        } else if (usernameFind.length > 0) {
            res.json({ message: "Username already in use" });
        } else {
            await user.save();
            res.json({ message: "user Saved", data: user });
        }
    }

    async login(res: Response) {
        const { email, password } = this;
        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (user) {

            const validatePassword: boolean = DescryptAndCompare(user.password, password, process.env.ENCRYPT_KEY);
            if (validatePassword === false) {
                console.log(validatePassword);
                res.json({ message: "invalid password" });
            } else {
                const tokenKey: any = process.env.JWTKEY;
                const token = jwt.sign(
                    {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        avatar: user.avatar,
                        genre: user.genre,
                        username: user.username,
                        encryptedPassword: user.password,
                        password: password,
                    },
                    tokenKey
                );
                res.json({ message: "hi there!", token: token });


            }

        } else {
            res.json({ message: "invalid email" });
        }

    }
}

export default UserClass;
