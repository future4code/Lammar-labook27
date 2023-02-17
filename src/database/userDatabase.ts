import { Database } from "../connection/BaseDatabase";
import { CustomError } from "../error/CustomError";
import { makeFriend, post, user } from "../model/types";

export class UserDatabase extends Database {
  private TABLE_USERS = "labook_users";
  private TABLE_POSTS = "labook_posts";
  private TABLE_FRIENDS = "labook_friends";

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

  public getUserByEmail = async (email: string): Promise<user> => {

    const result = await Database.connection
      .select("*")
      .from(this.TABLE_USERS)
      .where({ email });
    return result[0];
  }

}
