import { LabookRepository } from "../business/LabookRepository";
import { Database } from "../connection/BaseDatabase";
import { CustomError } from "../error/CustomError";
import { makeFriend, post, user, like, commentModel } from "../model/types";

export class LabookDB extends Database implements LabookRepository {
  private TABLE_USERS = "labook_users";
  private TABLE_POSTS = "labook_posts";
  private TABLE_FRIENDS = "labook_friends";
  private TABLE_LIKES = "labook_likes";
  private TABLE_COMMENTS = "labook_comments";

  public createUser = async (user: user): Promise<void> => {
    try {
      Database.connection.initialize();
      await Database.connection
        .insert({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        })
        .into(this.TABLE_USERS);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    } finally {
      Database.connection.destroy();
    }
  };

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
      return result[0];
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    } finally {
      Database.connection.destroy();
    }
  };

  public makeFriends = async (friends: makeFriend) => {
    try {
      Database.connection.initialize();
      await Database.connection
        .insert({
          id: friends.id,
          user_id: friends.user_id,
          friend_id: friends.friend_id,
        })
        .into(this.TABLE_FRIENDS);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    } finally {
      Database.connection.destroy();
    }
  };

  public unFriend = async (id: string) => {
    try {
      Database.connection.initialize();
      await Database.connection(this.TABLE_FRIENDS).delete().where({ id });
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    } finally {
      Database.connection.destroy();
    }
  };
 
  public getFeedByFriends = async (id: string): Promise<post[]> => {
    try {
      Database.connection.initialize();
      const result = await Database.connection
        .select("*")
        .from(this.TABLE_POSTS)
        .join(
          this.TABLE_FRIENDS,
          `${this.TABLE_POSTS}.author_id`,
          `${this.TABLE_FRIENDS}.friend_id`
        )
        .where(`${this.TABLE_FRIENDS}.user_id`, id)
        .orderBy(`${this.TABLE_POSTS}.created_at`, "desc")
        .limit(5);
      return result;
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