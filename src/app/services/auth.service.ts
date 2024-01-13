import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResponseAuth } from '@interfaces/req-response';
import { UserLogin } from '@interfaces/req-user';
import { map } from 'rxjs';

interface State {
  user: any[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  urlApi = 'http://localhost:5000/';

  constructor() {}

  login = (user: UserLogin) => {
    return this.http
      .post<ResponseAuth>(this.urlApi + 'auth/login/', user)
      .pipe(map((data) => data));
  };

  isLogged = (): boolean => {
    return sessionStorage.getItem('token') ? true : false;
  };

  getUserName = () => {
    return sessionStorage.getItem('user');
  };

  getUserEmail = () => {
    return sessionStorage.getItem('email');
  };

  getUserId = () => {
    return sessionStorage.getItem('id')!;
  };
}
