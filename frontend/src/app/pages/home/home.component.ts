import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit {

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.authService.getCurrentUser().subscribe(user => {
          this.authService.currentUserSig.set(user);  // Frissíti a currentUserSig-t
        });
      } else {
        this.authService.currentUserSig.set(null);  // Ha nincs bejelentkezve, null-ra állítja
        
      }
    });
  }

}
