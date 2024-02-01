import { Router } from 'express';
import postController from '../controllers/post-controller';

export const postRouter = Router();

postRouter.get('/post', postController.findPosts);
postRouter.get('/post/:id', postController.findPostById);
postRouter.post('/post', postController.createPost);
postRouter.put('/post/:id', postController.updatePost);
postRouter.delete('/post/:id', postController.deletePost);
