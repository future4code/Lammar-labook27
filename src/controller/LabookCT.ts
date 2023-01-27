import { Request, Response } from "express";
import { LabookBS } from "../business/LabookBS";
import { CommentInputDTO, FriendInputDTO, LikeInputDTO, PostInputDTO, UserInputDTO } from "../model/inputsDTO";

export class LabookCT {
  constructor(private labookBS: LabookBS) {}

  async ping (req: Request, res: Response) {
    try {
      res.status(200).send({ message: "Pong!" })
    } catch (error: any) {
      res.status(400).send({ message: error.message })
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const input: UserInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      await this.labookBS.createUser(input);

      res.status(201).send({ message: "Success!", input });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ message: error.message || error.sqlMessage });
    }
  }

  async createPost(req: Request, res: Response) {
    try {
      const input: PostInputDTO = {
        photo: req.body.photo,
        description: req.body.description,
        type: req.body.type,
        author_id: req.body.author_id,
      };
    
      await this.labookBS.createPost(input);
      res.status(201).send({ message: "Success!", input });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ message: error.message || error.sqlMessage });
    }
  }

  async getPostById(req: Request, res: Response) { {
    try {
      const result = await this.labookBS.getPostById(req.params.id);

      res.status(200).send(result);
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ message: error.message || error.sqlMessage });
    }
  }
  }

  async makeFriends(req: Request, res: Response) {
    try {
      const input: FriendInputDTO = {
        user_id: req.body.user_id,
        friend_id: req.body.friend_id,
      };
      
      await this.labookBS.makeFriends(input);
      res.status(201).send({ message: "Success!", input });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ message: error.message || error.sqlMessage });
    }
  }

  async unFriend(req: Request, res: Response) {
    try {
    
      await this.labookBS.unFriend(req.params.id);

      res.status(201).send({ message: "Success!" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ message: error.message || error.sqlMessage });
    }
  }

  async getFeedByFriends(req: Request, res: Response) {
    try {
      
      const result = await this.labookBS.getFeedByFriends(req.params.id);
      res.status(200).send(result);
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ message: error.message || error.sqlMessage });
    }
  }

  async getPostsByType(req: Request, res: Response) {
    try {
      const result = await this.labookBS.getPostsByType(req.params.type);
      res.status(200).send(result);
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ message: error.message || error.sqlMessage });
    }
  }

  async likePost(req: Request, res: Response) {
    try {
      const input: LikeInputDTO = {
        user_id: req.body.user_id,
        post_id: req.body.post_id,
    }
      await this.labookBS.likePost(input);
      res.status(201).send({ message: "Success!", input });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ message: error.message || error.sqlMessage });
    }
    
  }

  async unlikePost(req: Request, res: Response) {
    try {
      await this.labookBS.unlikePost(req.params.id);
      res.status(201).send({ message: "Success!" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ message: error.message || error.sqlMessage });
    }
  }

  async commentPost(req: Request, res: Response) {
    try {
      const input: CommentInputDTO = {
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        comment: req.body.comment,
    }
      await this.labookBS.commentPost(input);
      res.status(201).send({ message: "Success!", input });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ message: error.message || error.sqlMessage });
    }
  }
}
