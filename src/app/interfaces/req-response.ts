import { User, UserLoggedIn } from './req-user';

export interface Response {
  error: string;
  data: [];
}

export interface ResponseUser {
  error: string;
  data: User;
}

export interface ResponseAuth {
  error: string;
  data: {
    token: string;
    username: UserLoggedIn;
  };
}
