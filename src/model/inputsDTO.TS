export interface PostInputDTO {
    photo: string;
    description: string;
    type: any;
    author_id: string;
}

export interface FriendInputDTO {
    user_id: string;
    friend_id: string;
}

export interface UserInputDTO {
    name: string;
    email: string;
    password: string;
}