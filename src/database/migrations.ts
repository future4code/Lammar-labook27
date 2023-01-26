import { conn } from "../connection/conn"

conn
   .raw(`

   SET FOREIGN_KEY_CHECKS=0;

   DROP TABLE IF EXISTS labook_users;
   DROP TABLE IF EXISTS labook_posts;
   DROP TABLE IF EXISTS labook_friends;
   
   SET FOREIGN_KEY_CHECKS=1;


      CREATE TABLE IF NOT EXISTS labook_users(
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS labook_posts(
         id VARCHAR(255) PRIMARY KEY,
         photo VARCHAR(255) NOT NULL,
         description VARCHAR(255) NOT NULL,
         type ENUM("normal","event") DEFAULT "normal",
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         author_id VARCHAR(255),
         FOREIGN KEY (author_id) REFERENCES labook_users (id)
      );

      CREATE TABLE IF NOT EXISTS labook_friends(
         id VARCHAR(255) PRIMARY KEY,
         user_id VARCHAR(255),
         friend_id VARCHAR(255),
         FOREIGN KEY (user_id) REFERENCES labook_users (id)
         )
   `)
   .then(() => {
    console.log(`Tables created successfully!`)
})
.catch((error: any) => console.log(error.sqlMessage || error.message))
