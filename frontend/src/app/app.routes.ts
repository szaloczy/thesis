import { Routes } from '@angular/router';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
    {
        path:"login", component: UserLoginComponent
    },
    {
        path:"register", component: UserRegisterComponent
    },
    {
        path:"admin", component: AdminComponent, canActivate: [AuthGuard]
    },
    {
        path:"", component: DashboardComponent, canActivate: [AuthGuard]
    },
    {
        path: '**', redirectTo: "login"
    }
];
