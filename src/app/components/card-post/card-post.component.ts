import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PostsService } from '@services/posts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { FormUpdatePostComponent } from '@components/form-update-post/form-update-post.component';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-card-post',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.scss',
})
export class CardPostComponent {
  @Input({ required: true }) post: any;
  public postsService = inject(PostsService);
  public authService = inject(AuthService);
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  handlerDeletePost = (id: number) => {
    this.postsService.deletePost(id).subscribe((res) => {
      this._snackBar.open('Se ha eliminado correctamente!!', 'OK');
      this.postsService.getPosts();
    });
  };

  openDialog(post: any) {
    this.dialog.open(FormUpdatePostComponent, {
      data: {
        post: post,
      },
    });
  }
}
