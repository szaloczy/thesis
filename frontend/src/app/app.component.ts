import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,  
    SidenavComponent,
    MatSidenavModule,
    RouterOutlet
  ],
  templateUrl: "./app.component.html",
  styleUrl: './app.component.scss'
})

export class AppComponent {
  showSideNav: boolean = false;

  authService = inject(AuthService);
}