import mongoose, { Schema, Document } from "mongoose";

export interface IMedia extends Document {
    url: string;
    type: string;
    size:number
    cloudinaryId: string;
    userEmail: string;
}

const MediaModel: Schema = new Schema({
    url: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    cloudinaryId: {
        type: String,
        default: ""
    },
    userEmail: {
        type: String,
        required: true
    }
});

export default mongoose.model<IMedia>("Media", MediaModel);
