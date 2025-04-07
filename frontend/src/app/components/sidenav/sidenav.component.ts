import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);

  // Sidenav állapotkezelés
  collapsed = signal(false);

  // Felhasználói adatok
  username: string = '';
  role: string = '';

  // Méretek
  readonly collapsedSidenavWidth = 65;
  readonly extendedSidenavWidth = 122;

  // Profilkép méretezés
  profilePicSize = computed(() => this.collapsed() ? '40' : '80');

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.collapsed.set(!this.collapsed());
  }

  logout() {
    this.authService.logout();
  }
}