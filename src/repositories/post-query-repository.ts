import { Types } from 'mongoose';
import { ViewPostDto } from '../dto/view-post-dto';
import { PostModel } from '../models/Post-model';

type dbPostType = {
    _id: Types.ObjectId;
    title: string;
    pictureSrc: string;
    date: Date;
    authorId: Types.ObjectId;
    __v: number;
};

class PostQueryRepo {
    async findPosts(title: string): Promise<ViewPostDto[]> {
        let filter = {};

        if (title) {
            filter = { title: { $regex: title } };
        }

        const dbPosts = await PostModel.find(filter);

        return dbPosts.map((p) => {
            //@ts-ignore
            return this._mapToViewDto(p);
        });
    }

    async findPostById(id: string): Promise<ViewPostDto> {
        const dbPost = await PostModel.findById(id);

        //@ts-ignore
        return this._mapToViewDto(dbPost);
    }

    private _mapToViewDto(dbPosts: dbPostType | null): ViewPostDto {
        return {
            id: dbPosts!._id.toString(),
            title: dbPosts!.title,
            pictureSrc: dbPosts!.pictureSrc,
            date: dbPosts!.date.toString(),
            authorId: dbPosts!.authorId.toString(),
        };
    }
}

export default new PostQueryRepo();
