import { Routes } from '@angular/router';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path:"login", component: UserLoginComponent
    },
    {
        path:"register", component: UserRegisterComponent
    },
    {
        path:"home", component: HomeComponent, canActivate: [authGuard]
    },
    {
        path: '**', redirectTo: "login"
    }
];
