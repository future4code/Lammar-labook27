import { Database } from "../connection/BaseDatabase";
import { CustomError } from "../error/CustomError";
import { commentModel, like, post } from "../model/types";

export class PostDatabase extends Database {
    private TABLE_POSTS = "labook_posts";
    private TABLE_LIKES = "labook_likes";
  private TABLE_COMMENTS = "labook_comments";

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

  public getPostsByType = async (type: string): Promise<post[]> => {
    try {
      Database.connection.initialize();
      const result = await Database.connection
        .select("*")
        .from(this.TABLE_POSTS)
        .where({ type })
        .orderBy(`${this.TABLE_POSTS}.created_at`, "desc");
      return result;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    } finally {
      Database.connection.destroy();
    }
  };

   public likePost = async (likes : like) => {
    try {
      Database.connection.initialize();
      await Database.connection
        .insert({
          id: likes.id,
          user_id: likes.user_id,
          post_id: likes.post_id,
        })
        .into(this.TABLE_LIKES);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    } finally {
      Database.connection.destroy();
    }
  };

  public unlikePost = async (id: string) => {
    try {
      Database.connection.initialize();
      await Database.connection(this.TABLE_LIKES).delete().where({ id });
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    } finally {
      Database.connection.destroy();
    }
  };

  public commentPost = async (comment: commentModel) => {
    try {
      Database.connection.initialize();
      await Database.connection
        .insert({
          id: comment.id,
          user_id: comment.user_id,
          post_id: comment.post_id,
          comment: comment.comment,
        })
        .into(this.TABLE_COMMENTS);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    } finally {
      Database.connection.destroy();
    }
  };
}