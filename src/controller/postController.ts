import { Request, Response } from "express";
import { PostBusiness } from "../business/postBusiness";
import {
  CommentInputDTO,
  FriendInputDTO,
  LikeInputDTO,
  PostInputDTO,
  UserInputDTO,
} from "../model/inputsDTO";

const postBusiness = new PostBusiness();

export class PostController {
    async createPost(req: Request, res: Response) {
    try {
      const input: PostInputDTO = {
        photo: req.body.photo,
        description: req.body.description,
        type: req.body.type,
        author_id: req.body.author_id,
      };

        await postBusiness.createPost(input);

      res.status(201).send({ message: "Success!", input });
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send({ message: error.message || error.sqlMessage });
    }
  }

  async getPostById(req: Request, res: Response) {
    try {

      const id = req.params.id;

      const result = await postBusiness.getPostById(id);

      res.status(200).send(result);
    }
    catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send({ message: error.message || error.sqlMessage });
    }
  } 
}