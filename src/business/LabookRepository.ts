import { user, post, like, commentModel } from "../model/types";
import { FriendInputDTO } from "../model/inputsDTO";

export interface LabookRepository {
    createUser(user: user): Promise<void>;
    createPost(post: post): Promise<void>;
    getPostById(id: string): Promise<post>;
    makeFriends(input: FriendInputDTO): Promise<void>;
    unFriend(id: string): Promise<void>;
    getFeedByFriends(id: string): Promise<post[]>;
    getPostsByType(type: string): Promise<post[]>;
    likePost(input: like): Promise<void>;
    unlikePost(id: string): Promise<void>;
    commentPost(input: commentModel): Promise<void>;
}

