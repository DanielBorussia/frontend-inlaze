import { Component, EventEmitter, Output, inject } from '@angular/core';
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
import { UserCreate } from '@interfaces/req-user';
import { UsersService } from '@services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-create-user',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './form-create-user.component.html',
  styleUrl: './form-create-user.component.scss',
})
export class FormCreateUserComponent {
  @Output() tabSelected = new EventEmitter<number>();
  form: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    edad: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public userService = inject(UsersService);

  constructor(private _snackBar: MatSnackBar) {}

  createUser = () => {
    if (this.form.valid) {
      const newUser: UserCreate = {
        fullName: this.form.value.fullName,
        age: this.form.value.edad,
        email: this.form.value.email,
        password: this.form.value.password,
      };
      console.log(newUser);
      this.userService.createUser(newUser).subscribe((res) => {
        if (!res.error) {
          this.tabSelected.emit(0);
          this._snackBar.open(
            'Se ha registrado correctamnete, Inicia Sesión',
            'OK'
          );
          this.form.reset();
        }
      });
    }
  };
}
