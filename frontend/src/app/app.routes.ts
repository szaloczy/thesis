import { Routes } from '@angular/router';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:"login", component: UserLoginComponent
    },
    {
        path:"register", component: UserRegisterComponent
    },
    {
        path:"", component: DashboardComponent, canActivate: [AuthGuard]
    },
    {
        path: '**', redirectTo: "login"
    }
];
