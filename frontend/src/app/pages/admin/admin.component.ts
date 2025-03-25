import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  authService = inject(AuthService);
  userService = inject(UserService);
  users: any[] = [];

  ngOnInit(): void {
    this.userService.getAllUser().subscribe((response => {
      if( response.success) {
        this.users = response.data;
      } else {
        
      }
    }));
  }

  logout() {
    this.authService.logout();
  }
}
