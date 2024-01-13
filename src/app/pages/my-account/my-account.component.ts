import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserUpdate } from '@interfaces/req-user';
import { AuthService } from '@services/auth.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export default class MyAccountComponent {
  userService = inject(UsersService);
  authService = inject(AuthService);
  user = signal({
    fullName: '',
    age: 0,
    email: '',
    createdAt: '',
    _id: '',
  });

  form: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    edad: new FormControl('', Validators.required),
  });

  editingMode: boolean = false;

  constructor(private _snackBar: MatSnackBar) {
    this.getUser();
  }

  getUser = () => {
    this.userService
      .getUserById(this.authService.getUserId())
      .subscribe((res) => {
        if (!res.error) {
          this.user.set(res.data);
        }
      });
  };

  changeEdition = () => {
    this.editingMode = true;
    this.form = new FormGroup({
      fullName: new FormControl(this.user().fullName, Validators.required),
      email: new FormControl(this.user().email, [
        Validators.required,
        Validators.email,
      ]),
      edad: new FormControl(this.user().age, Validators.required),
    });
  };

  updateUser = () => {
    if (this.form.valid) {
      const user: UserUpdate = {
        fullName: this.form.value.fullName,
        age: this.form.value.edad,
        email: this.form.value.email,
      };

      this.userService.updateUser(user, this.user()._id).subscribe((res) => {
        if (!res.error) {
          this.getUser();
          this._snackBar.open(
            'Se han actualizado los datos correctamente',
            'OK'
          );
          this.editingMode = false;
        }
      });
    }
  };
}
