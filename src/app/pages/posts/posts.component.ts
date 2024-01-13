import { Component, inject } from '@angular/core';
import { CardPostComponent } from '@components/card-post/card-post.component';
import { FormCreatePostComponent } from '@components/form-create-post/form-create-post.component';
import { PostsService } from '@services/posts.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CardPostComponent, FormCreatePostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export default class PostsComponent {
  public postsService = inject(PostsService);
  constructor() {
    this.postsService.getPosts();
  }
}
