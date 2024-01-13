export interface Post {
  _id: string;
  title: string;
  content: string;
  userId: number;
  likes: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: UserPost;
}

export interface UserPost {
  _id: string;
  fullName: string;
  email: string;
}

export interface PostCreate {
  title: string;
  content: string;
  userId: string;
}

export interface PostUpdate {
  title: string;
  content: string;
}
