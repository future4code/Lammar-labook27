import { PostDatabase } from "../database/postDatabase";
import { UserDatabase } from "../database/userDatabase";
import { CustomError } from "../error/CustomError";
import { CommentInputDTO, FriendInputDTO, LikeInputDTO, PostInputDTO, UserInputDTO } from "../model/inputsDTO";
import { post, like, makeFriend, commentModel } from "../model/types";
import { generateId } from "../services/idGenerator";

const postDatabase = new PostDatabase();

export class PostBusiness {
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
        author_id: author_id,
      };

        await postDatabase.createPost(post);
        
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async getPostById(id: string) {
    try {

      const posts = await postDatabase.getPostById(id)

      if (!posts) {
        throw new Error("Post not found");
      }

      return posts
      
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

    return await postDatabase.getPostsByType(type);
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

      return await postDatabase.likePost(like);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }

  async unlikePost(id: string): Promise<void> {
    try {
      if (!id) {
        throw new Error("Id must be provided");
      }

      await postDatabase.unlikePost(id);
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

      await postDatabase.commentPost(commentRespost);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
  
}