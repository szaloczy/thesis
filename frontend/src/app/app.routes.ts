import { Routes } from '@angular/router';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';

export const routes: Routes = [
    {
        path:"login", component: UserLoginComponent
    },
    {
        path:"register", component: UserRegisterComponent
    },
    {
        path: '**', redirectTo: "login"
    }
];
