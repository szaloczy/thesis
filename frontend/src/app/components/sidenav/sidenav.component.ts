import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../types';

@Component({
  selector: 'app-sidenav',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit{

  userService = inject(UserService);
  authService = inject(AuthService);

  sideNavCollapsed = signal(false);

  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }
  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');

  user = computed(() => this.userService.user());

  ngOnInit(): void {
     this.userService.getUserData(2);
  }

  logout() {
    this.authService.logout();
    this.userService.clearUser();
  }
}