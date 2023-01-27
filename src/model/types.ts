export type authenticationData = {
  id: string;
};

export type user = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export enum POST_TYPES {
  NORMAL = "normal",
  EVENT = "event",
}

export type post = {
  id: string;
  photo: string;
  description: string;
  type: POST_TYPES;
  author_id: string;
};

export type makeFriend = {
  id: string;
  user_id: string;
  friend_id: string;
};

export type like = {
  id: string;
  user_id: string;
  post_id: string;
};

export type commentModel = {
  id: string;
  user_id: string;
  post_id: string;
  comment: string;
};
