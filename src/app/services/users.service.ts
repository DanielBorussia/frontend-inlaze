import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Response, ResponseUser } from '@interfaces/req-response';
import { User, UserCreate, UserUpdate } from '@interfaces/req-user';
import { map } from 'rxjs';

interface State {
  user: User;
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  urlApi = 'http://localhost:5000/';
  #state = signal<State>({
    loading: true,
    user: {
      _id: '',
      fullName: '',
      age: 0,
      email: '',
      createdAt: '',
    },
  });

  public user = computed(() => this.#state().user);
  constructor() {}

  createUser = (user: UserCreate) => {
    return this.http
      .post<Response>(this.urlApi + 'user', user)
      .pipe(map((data) => data));
  };

  getUserById = (id: string) => {
    return this.http
      .get<ResponseUser>(this.urlApi + 'user/' + id)
      .pipe(map((data) => data));
  };

  updateUser = (user: UserUpdate, id: string) => {
    return this.http
      .put<Response>(this.urlApi + 'user/' + id, user)
      .pipe(map((data) => data));
  };
}
