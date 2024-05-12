export interface IUser {
    id: string
    email: string
    password: string
    name?: string
    avatarUrl?: string
    birthDate?: Date
    createdAt: Date
    updatedAt: Date
    bio?: string
    location?: string
    posts: IPost[]
    following: IFollows[]
    followers: IFollows[]
    likes: ILike[]
    comments: IComment[]
    isFollowing?: boolean
}

export interface IFollows {
    id: string
    follower: IUser
    followerId: string
    following: IUser
    followingId: string
}

export interface IPost {
    id: string
    content: string
    author: IUser
    authorId: string
    likes: ILike[]
    comments: IComment[]
    likedByUser: boolean
    createdAt: Date
    updatedAt: Date
}

export interface ILike {
    id: string
    user: IUser
    userId: string
    post: IPost
    postId: string
}

export interface IComment {
    id: string
    content: string
    user: IUser
    userId: string
    post: IPost
    postId: string
}
