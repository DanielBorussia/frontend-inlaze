import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PostsService } from '@services/posts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '@services/auth.service';
@Component({
  selector: 'app-form-create-post',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './form-create-post.component.html',
  styleUrl: './form-create-post.component.scss',
})
export class FormCreatePostComponent {
  title: string = '';
  content: string = '';
  loading: boolean = false;
  public postsService = inject(PostsService);
  public authService = inject(AuthService);
  constructor(private _snackBar: MatSnackBar) {}

  handlerCreatePost = () => {
    this.loading = true;
    this.postsService
      .createPost({
        title: this.title,
        content: this.content,
        userId: this.authService.getUserId(),
      })
      .subscribe((res) => {
        this._snackBar.open('Se ha publicado correctamente!', 'OK');
        this.loading = false;
        this.title = '';
        this.content = '';
        this.postsService.getPosts();
      });
  };
}
