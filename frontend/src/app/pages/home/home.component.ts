import { Component, inject, OnInit } from '@angular/core';
import { User, UserRole } from '../../types';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  userService = inject(UserService);
  user: User = {
    username: '',
    email: '',
    role: UserRole.hallgato
  };

  ngOnInit(): void {
    this.userService.getUserData().subscribe((res) =>{
      if(res.success == true) {
        this.user = res.data;
      }
    })
  }
  
}
