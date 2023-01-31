import { Database } from "../connection/BaseDatabase";
import { CustomError } from "../error/CustomError";
import { post } from "../model/types";

export class PostDatabase extends Database {
    private TABLE_POSTS = "labook_posts";

     public createPost = async (post: post): Promise<void> => {
    try {
      Database.connection.initialize();
      await Database.connection
        .insert({
          id: post.id,
          photo: post.photo,
          description: post.description,
          type: post.type,
          author_id: post.author_id,
        })
        .into(this.TABLE_POSTS);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    } finally {
      Database.connection.destroy();
    }
  };

  public getPostById = async (id: string) => {
    try {
      
      Database.connection.initialize();
      const result = await Database.connection(this.TABLE_POSTS)
        .select("*")
        .where({ id });
      return result[0]
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    } finally {
      Database.connection.destroy();
    }
  };
}