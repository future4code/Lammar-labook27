export interface PostInputDTO {
    
    photo: string;
    description: string;
    type: any;
    author_id: string;
}

export interface InsertInputDTO {
    id: string;
    photo: string;
    description: string;
    type: any;
    authorId: string;
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

export interface LikeInputDTO {
    user_id: string;
    post_id: string;
}

export interface CommentInputDTO {
    user_id: string;
    post_id: string;
    comment: string;
}