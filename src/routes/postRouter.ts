
import { Router }from "express";
import { PostController } from "../controller/postController";

const postController = new PostController();

export const postRouter = Router();

postRouter.post("/create", postController.createPost);
postRouter.get('/:id', postController.getPostById);
postRouter.get('/type/:type', postController.getPostsByType)
postRouter.post('/like', postController.likePost)
postRouter.delete('/deslike/:id', postController.unlikePost)
postRouter.post('/comment', postController.commentPost)



