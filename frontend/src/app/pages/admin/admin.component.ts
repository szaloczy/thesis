import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  users: string[] = [];

  userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUsers()
    .subscribe((response) => {
      if(response.success) {
        this.users = response.data.map((user: { username: any; }) => user.username);
      }
    })
  }
}
