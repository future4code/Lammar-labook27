import { LabookDB } from "../database/LabookDB";
import { CustomError } from "../error/CustomError";
import { FriendInputDTO, PostInputDTO, UserInputDTO } from "../model/inputsDTO";
import { makeFriend, post, user } from "../model/types";
import { generateId } from "../services/idGenerator";

export class LabookBS {
  async createUser(input: UserInputDTO): Promise<void> {
    try {
      const { name, email, password } = input;

      if (!name || !email || !password) {
        let message = `"name", "email" and "password" must be provided'`;
        throw new Error(message);
      }

      if (email.indexOf("@") === -1) {
        throw new Error("Invalid email");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      if (name.length < 3) {
        throw new Error("Name must be at least 3 characters");
      }

      const id: string = generateId();

      const labookDT = new LabookDB();

      const user: user = { id, name, email, password };

      await labookDT.createUser(user);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async createPost(input: PostInputDTO): Promise<void> {
    try {
      const { photo, description, type, author_id } = input;

      if (!photo || !description || !type || !author_id) {
        throw new Error(
          `"photo", "description", "type", "created_at" and "author_id" must be provided'`
        );
      }

      if (type !== "normal" && type !== "evento") {
        throw new Error("Type must be 'normal' or 'evento'");
      }

      const id: string = generateId();

      const labookDT = new LabookDB();

      const post: post = { id, photo, description, type, author_id };

      await labookDT.createPost(post);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async getPostById(id: string) {
    try {
      if (!id) {
        throw new Error("Id must be provided");
      }

      if (id.length !== 36) {
        throw new Error("Invalid id");
      }

      const labookDT = new LabookDB();

      return await labookDT.getPostById(id);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async makeFriends(input: FriendInputDTO): Promise<void> {
    try {
      const { user_id, friend_id } = input;

      if (!user_id || !friend_id) {
        throw new Error("user_id and friend_id must be provided");
      }

      if (user_id === friend_id) {
        throw new Error("user_id and friend_id must be different");
      }

      if (user_id.length !== 36 || friend_id.length !== 36) {
        throw new Error("Invalid id");
      }

      const id: string = generateId();

      const labookDT = new LabookDB();

      const makeFriend: makeFriend = {
        id,
        user_id,
        friend_id,
      };

      await labookDT.makeFriends(makeFriend);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async unFriend(id: string): Promise<void> {
    try {
      if (!id) {
        throw new Error("Id must be provided");
      }

      const labookDB = new LabookDB();

      await labookDB.unFriend(id);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async getFeedByFriends(id: string): Promise<any> {
    try {
      if (!id) {
        throw new Error("Id must be provided");
      }

      if (id.length !== 36) {
        throw new Error("Invalid id");
      }

      const labookDB = new LabookDB();

      return await labookDB.getFeedByFriends(id);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}
