import { CustomError } from "../error/CustomError";
import { CommentInputDTO, FriendInputDTO, LikeInputDTO, PostInputDTO, UserInputDTO } from "../model/inputsDTO";
import { makeFriend, post, user, like, commentModel } from "../model/types";
import { generateId } from "../services/idGenerator";
import { LabookRepository } from "./LabookRepository";

export class LabookBS {
  constructor(private labookDB: LabookRepository) {}

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

      const user: user = { id, name, email, password };

      await this.labookDB.createUser(user);
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

      if (type !== "normal" && type !== "event") {
        throw new Error("Type must be 'normal' or 'evento'");
      }

      const id: string = generateId();

      const post: post = { 
        id,
        photo, 
        description, 
        type, 
        author_id: author_id
      };

      await this.labookDB.createPost(post);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async getPostById(id: string): Promise<post> {
    try {
      if (!id) {
        throw new Error("Id must be provided");
      }

      if (id.length !== 36) {
        throw new Error("Invalid id");
      }

      return await this.labookDB.getPostById(id);
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

      const makeFriend: makeFriend = {
        id,
        user_id,
        friend_id,
      };

      await this.labookDB.makeFriends(makeFriend);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async unFriend(id: string): Promise<void> {
    try {
      if (!id) {
        throw new Error("Id must be provided");
      }

      await this.labookDB.unFriend(id);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async getFeedByFriends(id: string): Promise<post[]> {
    try {
      if (!id) {
        throw new Error("Id must be provided");
      }

      if (id.length !== 36) {
        throw new Error("Invalid id");
      }

      return await this.labookDB.getFeedByFriends(id);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async getPostsByType(type: string): Promise<post[]> {
    try {
      if (!type) {
        throw new Error("Type must be provided");
      }

      if (type !== "normal" && type !== "event") {
        throw new Error("Type must be 'normal' or 'evento'");
      }

      return await this.labookDB.getPostsByType(type);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async likePost(input: LikeInputDTO): Promise<any> {
    try {
      const { user_id, post_id } = input;

      if (!user_id || !post_id) {
        throw new Error("user_id and post_id must be provided");
      }

      if (user_id.length !== 36 || post_id.length !== 36) {
        throw new Error("Invalid id");
      }

      const id: string = generateId();

      const like: like = {
        id,
        user_id,
        post_id,
      };

      return await this.labookDB.likePost(like);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async unlikePost(id: string): Promise<void> {
    try {
      if (!id) {
        throw new Error("Id must be provided");
      }

      await this.labookDB.unlikePost(id);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async commentPost(input: CommentInputDTO): Promise<void> {
    try {
      const { user_id, post_id, comment } = input;

      if (!user_id || !post_id || !comment) {
        throw new Error("user_id, post_id and comment must be provided");
      }

      if (user_id.length !== 36 || post_id.length !== 36) {
        throw new Error("Invalid id");
      }

      const id: string = generateId();

      const commentRespost: commentModel = {
        id,
        user_id,
        post_id,
        comment,
      };

      await this.labookDB.commentPost(commentRespost);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}
