import { PostModel } from '../models/Post-model';
import { Types } from 'mongoose';

class PostRepo {
    async createPost(
        title: string,
        fileName: string,
        authorId: string
    ): Promise<string> {
        const createdPost = await PostModel.create({
            title: title,
            pictureSrc: fileName,
            authorId: new Types.ObjectId(authorId),
        });

        return createdPost._id.toString();
    }

    async updatePost(id: string, title: string): Promise<Boolean> {
        const updatePost = await PostModel.findByIdAndUpdate(id, {
            title: title,
        });

        if (!updatePost) {
            throw new Error();
        } else {
            return true;
        }
    }

    async deletePost(id: string): Promise<Boolean> {
        const isDeleted = await PostModel.findByIdAndDelete(id);

        if (!isDeleted) {
            throw new Error('Пост не найден');
        } else {
            return true;
        }
    }
}

export default new PostRepo();
