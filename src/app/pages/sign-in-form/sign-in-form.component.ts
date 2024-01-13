import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { FormCreateUserComponent } from '@components/form-create-user/form-create-user.component';
import { LoginComponent } from '@components/login/login.component';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [
    MatTabsModule,
    LoginComponent,
    FormCreateUserComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
})
export default class SignInFormComponent {
  tabSelected = signal(0);

  changeTab = (value: number) => {
    console.log('---->', value);
    this.tabSelected.set(value);
  };
}
