import { CommonModule } from '@angular/common';
import { Component, inject, OnInit} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,  
    SidenavComponent,
    MatSidenavModule
  ],
  templateUrl: "./app.component.html",
  styleUrl: './app.component.scss'
})

export class AppComponent {
  authService = inject(AuthService);
  router = inject(Router);
}