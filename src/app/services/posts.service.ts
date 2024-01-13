import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Response } from '@interfaces/req-response';
import { map } from 'rxjs';
import { Post, PostCreate, PostUpdate } from '@interfaces/req-post';

interface State {
  posts: Post[];
  loading: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpClient);
  urlApi = 'http://localhost:5000/';
  #state = signal<State>({
    loading: true,
    posts: [],
  });

  public posts = computed(() => this.#state().posts);

  constructor() {}

  getPosts = () => {
    return this.http
      .get<Response>(this.urlApi + 'post', this.createHeaders())
      .subscribe((res) => {
        this.#state.set({
          loading: false,
          posts: res.data,
        });
      });
  };

  createPost = (post: PostCreate) => {
    return this.http
      .post<Response>(this.urlApi + 'post', post, this.createHeaders())
      .pipe(map((data) => data));
  };

  updatePost = (post: PostUpdate, id: number) => {
    return this.http
      .put(this.urlApi + 'post/' + id, post, this.createHeaders())
      .pipe(map((data) => data));
  };

  deletePost = (id: number) => {
    return this.http
      .delete(this.urlApi + 'post/' + id, this.createHeaders())
      .pipe(map((data) => data));
  };

  createHeaders = () => {
    return {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token')!,
      }),
    };
  };
}
