import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  userService = inject(UserService);
  user: any = {};

  ngOnInit() {
    this.userService.getUserData(1).subscribe(response => {
      if (response.success) {
        this.user = response.data;
      }
    });
  }

}
