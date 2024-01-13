import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PostsService } from '@services/posts.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-form-update-post',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './form-update-post.component.html',
  styleUrl: './form-update-post.component.scss',
})
export class FormUpdatePostComponent {
  title: string = '';
  content: string = '';
  public postService = inject(PostsService);
  constructor(
    public dialogRef: MatDialogRef<FormUpdatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    this.title = data.post.title;
    this.content = data.post.content;
  }

  handleUpdatePost = () => {
    this.postService
      .updatePost(
        {
          title: this.title,
          content: this.content,
        },
        this.data.post._id
      )
      .subscribe((res) => {
        this.postService.getPosts();
        this._snackBar.open('Se ha actualizado correctamente!!', 'OK');
        this.dialogRef.close();
      });
  };
}
