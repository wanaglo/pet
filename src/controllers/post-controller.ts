import { Response } from 'express';
import {
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery,
} from '../utilities/request-generics';
import { QueryPostDto } from '../dto/query-post-dto';
import { UriPostDto } from '../dto/uri-post-dto';
import { UpdatePostDto } from '../dto/update-post-dto';
import { ViewPostDto } from '../dto/view-post-dto';
import postQueryRepo from '../repositories/post-query-repository';
import postService from '../domain/post-service';

class PostController {
    async findPosts(
        req: RequestWithQuery<QueryPostDto>,
        res: Response<ViewPostDto[]>
    ) {
        const foundPosts = await postQueryRepo.findPosts(req.query.title);

        res.json(foundPosts);
    }

    async findPostById(
        req: RequestWithParams<UriPostDto>,
        res: Response<ViewPostDto | { message: string }>
    ) {
        try {
            const foundPost = await postQueryRepo.findPostById(req.params.id);

            res.json(foundPost);
        } catch (err) {
            console.log(err);
            res.status(404).json({ message: 'Пост не найден' });
        }
    }

    async createPost(
        req: any,
        res: Response<ViewPostDto | { message: string }>
    ) {
        try {
            const createdPostId = await postService.createPost(
                req.body.title,
                req.files.picture,
                //@ts-ignore
                req.user._id
            );

            const createdPost = await postQueryRepo.findPostById(createdPostId);

            res.status(201).json(createdPost);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Что то пошло не так' });
        }
    }

    async updatePost(
        req: RequestWithParamsAndBody<UriPostDto, UpdatePostDto>,
        res: Response<ViewPostDto | { message: string }>
    ) {
        try {
            const isUpdate = await postService.updatePost(
                req.params.id,
                req.body.title
            );

            if (isUpdate) {
                const updatedPost = await postQueryRepo.findPostById(
                    req.params.id
                );

                res.json(updatedPost);
            }
        } catch (err) {
            console.log(err);
            res.status(404).json({ message: 'Пост не найден' });
        }
    }

    async deletePost(
        req: RequestWithParams<UriPostDto>,
        res: Response<{ message: string }>
    ) {
        try {
            const isDeleted = await postService.deletePost(req.params.id);

            if (isDeleted) {
                res.json({ message: 'Пост успешно удален' });
            }
        } catch (err: any) {
            console.log(err);
            res.status(404).json({ message: err.message });
        }
    }
}

export default new PostController();
