import User from "../models/userModel";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import { Response } from "express";
import { Encrypt, DescryptAndCompare } from "../utils/encrypter";

interface IuserF {
    getProfile(res: Response, userId: string): Promise<void>;
    updateAvatar(
        res: Response,
        userId: string,
        imagePath: string
    ): Promise<void>;
}

export const user: IuserF = {
    async getProfile(res: Response, userId: string) {
        try {
            const userP = await User.findById(userId);
            if (userP) {
                res.json({ user: userP });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (e) {
            console.error(e);
            res.json({ message: "An error was occured" });
        }
    },
    async updateAvatar(res: Response, userId: string, imagePath: string) {
        try {
            const user: any = await User.findById(userId);

            if (user.cloudinaryId) {
                await cloudinary.v2.uploader.destroy(user.cloudinaryId);

                const uploadImageToCloudinary =
                    await cloudinary.v2.uploader.upload(imagePath);
                const imageUrl = uploadImageToCloudinary.url;
                const public_cloudinaryId = uploadImageToCloudinary.public_id;
                await User.findByIdAndUpdate(userId, {
                    avatar: imageUrl,
                    cloudinaryId: public_cloudinaryId,
                });
            } else {
                const uploadImageToCloudinary =
                    await cloudinary.v2.uploader.upload(imagePath);
                const imageUrl = uploadImageToCloudinary.url;
                const public_cloudinaryId = uploadImageToCloudinary.public_id;
                await User.findByIdAndUpdate(userId, {
                    avatar: imageUrl,
                    cloudinaryId: public_cloudinaryId,
                });
            }

            res.json({ message: "avatar updated"});
        } catch (e) {
            console.error(e);
            res.json({ message: "An error was occured" });
        }
    },
};

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
        try {
            const { firstName, lastName, email, genre, username, password } =
                this;

            const EncryptedPassword = Encrypt(
                password,
                process.env.ENCRYPT_KEY
            );

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
        } catch (e) {
            console.error(e);
            res.json({ message: "an error was occurred" });
        }
    }

    async login(res: Response) {
        try {
            const { email, password } = this;
            const user = await User.findOne({
                email: email.toLowerCase(),
            });

            if (user) {
                const validatePassword: boolean = DescryptAndCompare(
                    user.password,
                    password,
                    process.env.ENCRYPT_KEY
                );
                if (validatePassword === false) {
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
        } catch (e) {
            console.error(e);
            res.json({ message: "an error was occurred" });
        }
    }
}

export default UserClass;
