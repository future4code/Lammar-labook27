import { Database } from "../connection/BaseDatabase";

export class Repositories extends Database {
 userRepository = Database.connection("labook_users");
}