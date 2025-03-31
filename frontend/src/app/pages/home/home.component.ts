import { Component, inject, OnInit } from '@angular/core';
import { User, UserRole } from '../../types';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { Color, NgxChartsModule, ScaleType} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    NgxChartsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  userData = {
    totalHours: 120,
    submittedDocuments: 3,
    location: 'Miskolc, Hunyadi út A/23',
    internshipCompany: 'TechCorp',
    mentorName: 'Kiss Béla'
  };

  weeklyHours = [
    { name: 'Hétfő', value: 6 },
    { name: 'Kedd', value: 5 },
    { name: 'Szerda', value: 7 },
    { name: 'Csütörtök', value: 4 },
    { name: 'Péntek', value: 8 },
    { name: 'Szombat', value: 0 },
    { name: 'Vasárnap', value: 0 },
  ];

  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3f51b5', '#e91e63', '#ffc107', '#009688', '#9c27b0']
  };

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
