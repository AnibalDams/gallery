import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  genre: string;
  avatar: string;
  cloudinaryId: string;
  username: string;
  password: string;
}

const UserModel: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    default: ""
  },
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>("User", UserModel);
