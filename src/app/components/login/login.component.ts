import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { UserLogin } from '@interfaces/req-user';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private _snackBar: MatSnackBar) {}

  login = () => {
    if (this.form.valid) {
      const user: UserLogin = {
        email: this.form.value.email,
        password: this.form.value.password,
      };
      console.log(user);
      this.authService.login(user).subscribe(
        (res) => {
          console.log(res);
          if (!res.error) {
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('user', res.data.username.fullName);
            sessionStorage.setItem('id', res.data.username._id);
            sessionStorage.setItem('email', res.data.username.email);
            this.router.navigate(['/posts']);
          } else {
            this._snackBar.open(res.error, 'Vuelve a Intentarlo');
          }
        },
        (err) => {
          console.log(err);
          this._snackBar.open(err.error.error, 'Vuelve a Intentarlo');
        }
      );
    }
  };
}
