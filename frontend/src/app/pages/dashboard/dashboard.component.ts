import { Component, computed, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../types';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  userService = inject(UserService);
  //user = computed(() => this.userService.user());

  ngOnInit() {
  }

}
