import { Database } from "../connection/BaseDatabase";

export class LabookDB extends Database {
  private static TABLE_USERS = "labook_users";
  private static TABLE_POSTS = "labook_posts";
  private static TABLE_FRIENDS = "labook_friends";

  public async createUser({ id, name, email, password }: any): Promise<void> {
    await Database.connection
      .insert({ id, name, email, password })
      .into(LabookDB.TABLE_USERS);
  }

  public async createPost({
    id,
    photo,
    description,
    type,
    author_id,
  }: any): Promise<void> {
    await Database.connection
      .insert({ id, photo, description, type, author_id })
      .into(LabookDB.TABLE_POSTS);
  }

  public async getPostById(id: string): Promise<any> {
    const result = await Database.connection(LabookDB.TABLE_POSTS)
      .select("*")
      .where({ id });
    return result[0];
  }

  public async makeFriends({ id, user_id, friend_id }: any): Promise<void> {
    await Database.connection
      .insert({ id, user_id, friend_id })
      .into(LabookDB.TABLE_FRIENDS);
  }

  public async unFriend(id: string): Promise<void> {
    await Database.connection(LabookDB.TABLE_FRIENDS).delete().where({ id });
  }

  public async getFeedByFriends(id: string): Promise<any> {
    const result = await Database.connection
      .select("*")
      .from(LabookDB.TABLE_POSTS)
      .join(
        LabookDB.TABLE_FRIENDS,
        `${LabookDB.TABLE_POSTS}.author_id`,
        `${LabookDB.TABLE_FRIENDS}.friend_id`
      )
      .where(`${LabookDB.TABLE_FRIENDS}.user_id`, id)
      .orderBy(`${LabookDB.TABLE_POSTS}.created_at`, "desc");
    return result;
  }
}
