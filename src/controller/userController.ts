import { Request, Response } from "express";
import { UserBusiness } from "../business/userBusiness";
import {
  CommentInputDTO,
  FriendInputDTO,
  LikeInputDTO,
  PostInputDTO,
  UserInputDTO,
} from "../model/inputsDTO";

const userBusiness = new UserBusiness();

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const input: UserInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      await userBusiness.createUser(input);

      res.status(201).send({ message: "Success!", input });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async makeFriends(req: Request, res: Response) {
    try {
      const input: FriendInputDTO = {
        user_id: req.body.user_id,
        friend_id: req.body.friend_id,
      };

      await userBusiness.makeFriends(input);
      
      res.status(201).send({ message: "Success!", input });
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send({ message: error.message || error.sqlMessage });
    }
  }

  async unFriend(req: Request, res: Response) {
    try {
      await userBusiness.unFriend(req.params.id);

      res.status(201).send({ message: "Success!" });
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send({ message: error.message || error.sqlMessage });
    }
  }

  async getFeedByFriends(req: Request, res: Response) {
    try {
      const result = await userBusiness.getFeedByFriends(req.params.id);
      res.status(200).send(result);
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send({ message: error.message || error.sqlMessage });
    }
  }
}
