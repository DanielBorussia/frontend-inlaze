export interface UserCreate {
  fullName: string;
  age: number;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserLoggedIn {
  fullName: string;
  email: string;
  _id: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  age: number;
  createdAt: string;
}

export interface UserUpdate {
  fullName: string;
  email: string;
  age: number;
}
