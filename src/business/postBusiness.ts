import { PostDatabase } from "../database/postDatabase";
import { CustomError } from "../error/CustomError";
import { FriendInputDTO, PostInputDTO, UserInputDTO } from "../model/inputsDTO";
import { post, makeFriend } from "../model/types";
import { generateId } from "../services/idGenerator";

export class PostBusiness {
    async createPost(input: PostInputDTO): Promise<void> {
        const postDatabase = new PostDatabase();
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

}