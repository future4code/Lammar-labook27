
import { Router }from "express";
import { PostController } from "../controller/postController";

const postController = new PostController();

export const postRouter = Router();

postRouter.post("/create", postController.createPost);
