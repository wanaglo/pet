import postRepo from '../repositories/post-repository';
import * as uuid from 'uuid';
import path from 'path';
import fileUpload from 'express-fileupload';

class PostService {
    async createPost(
        title: string,
        file: fileUpload.UploadedFile,
        authorId: string
    ): Promise<string> {
        const fileName = uuid.v4() + '.jpg';
        const filePath = path.resolve('src/static', fileName);

        await file.mv(filePath);

        return await postRepo.createPost(title, fileName, authorId);
    }

    async updatePost(id: string, title: string): Promise<Boolean> {
        return await postRepo.updatePost(id, title);
    }

    async deletePost(id: string): Promise<Boolean> {
        return await postRepo.deletePost(id);
    }
}

export default new PostService();
