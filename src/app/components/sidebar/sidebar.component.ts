import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() closeSideBarEvent = new EventEmitter<boolean>();
  router = inject(Router);
  authService = inject(AuthService);
  logOut = () => {
    this.closeSideBarEvent.emit(false);
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  };

  toAccount = () => {
    this.closeSideBarEvent.emit(false);
    this.router.navigate(['/my-account']);
  };

  toPosts = () => {
    this.closeSideBarEvent.emit(false);
    this.router.navigate(['/posts']);
  };
}
