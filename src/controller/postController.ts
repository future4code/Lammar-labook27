import { Request, Response } from "express";
import { PostBusiness } from "../business/postBusiness";
import { UserBusiness } from "../business/userBusiness";
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

  async getPostsByType(req: Request, res: Response) {
    try {
      const result = await postBusiness.getPostsByType(req.params.type);
      res.status(200).send(result);
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send({ message: error.message || error.sqlMessage });
    }
  }

   async likePost(req: Request, res: Response) {
    try {
      const input: LikeInputDTO = {
        user_id: req.body.user_id,
        post_id: req.body.post_id,
      };
      await postBusiness.likePost(input);
      res.status(201).send({ message: "Success!", input });
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send({ message: error.message || error.sqlMessage });
    }
  }

  async unlikePost(req: Request, res: Response) {
    try {
      await postBusiness.unlikePost(req.params.id);
      res.status(201).send({ message: "Success!" });
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send({ message: error.message || error.sqlMessage });
    }
  }

   async commentPost(req: Request, res: Response) {
    try {
      const input: CommentInputDTO = {
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        comment: req.body.comment,
      };
      await postBusiness.commentPost(input);
      res.status(201).send({ message: "Success!", input });
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send({ message: error.message || error.sqlMessage });
    }
  }
}