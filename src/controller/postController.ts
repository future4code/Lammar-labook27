import { Request, Response } from "express";
import { PostBusiness } from "../business/postBusiness";
import {
  CommentInputDTO,
  FriendInputDTO,
  LikeInputDTO,
  PostInputDTO,
  UserInputDTO,
} from "../model/inputsDTO";

export class PostController {
    async createPost(req: Request, res: Response) {
    try {
      const input: PostInputDTO = {
        photo: req.body.photo,
        description: req.body.description,
        type: req.body.type,
        author_id: req.body.author_id,
      };

        const postBusiness = new PostBusiness();

        await postBusiness.createPost(input);

      res.status(201).send({ message: "Success!", input });
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send({ message: error.message || error.sqlMessage });
    }
  }
}