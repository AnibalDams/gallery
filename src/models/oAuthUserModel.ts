import mongoose, { Schema, Document } from "mongoose";

export interface IOauthUser extends Document {
  name: string;
  email: string;
  provider: string;
  avatar: string;
}

const oAuthUserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IOauthUser>("OauthUser", oAuthUserSchema);
