import { Request, Response } from "express";
import { LabookBS } from "../business/LabookBS";
import { FriendInputDTO, PostInputDTO, UserInputDTO } from "../model/inputsDTO";

export class LabookCT {

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

      const labookBS = new LabookBS();

      await labookBS.createUser(input);

      res.status(201).send({ message: "Success!", input });
    } catch (error: any) {
      res.send(error.message);
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
      const labookBS = new LabookBS();
      await labookBS.createPost(input);
      res.status(201).send({ message: "Success!", input });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async getPostById(req: Request, res: Response) {
    try {
      const labookBS = new LabookBS();

      const result = await labookBS.getPostById(req.params.id);

      res.status(200).send(result);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async makeFriends(req: Request, res: Response) {
    try {
      const input: FriendInputDTO = {
        user_id: req.body.user_id,
        friend_id: req.body.friend_id,
      };
      const labookBS = new LabookBS();
      await labookBS.makeFriends(input);
      res.status(201).send({ message: "Success!", input });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async unFriend(req: Request, res: Response) {
    try {
      const labookBS = new LabookBS();
      await labookBS.unFriend(req.params.id);

      res.status(201).send({ message: "Success!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async getFeedByFriends(req: Request, res: Response) {
    try {
      const labookBS = new LabookBS();
      const result = await labookBS.getFeedByFriends(req.params.id);
      res.status(200).send(result);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}
