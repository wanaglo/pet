import { Schema, model, Types } from 'mongoose';

const postSchema = new Schema({
    title: { type: String, required: true },
    pictureSrc: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    authorId: { type: Types.ObjectId, required: true, ref: 'users' },
});

export const PostModel = model('posts', postSchema);
