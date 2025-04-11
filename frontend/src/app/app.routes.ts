import { Routes } from '@angular/router';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { StudentEditorComponent } from './components/student-editor/student-editor.component';

export const routes: Routes = [
    {
        path:"home", component: HomeComponent, canActivate: [AuthGuard]
    },
    {
        path:"student-details", component: StudentEditorComponent
    },
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
        path:"dashboard", component: DashboardComponent, canActivate: [AuthGuard]
    },
    {
        path: '**', redirectTo: "login"
    }
];
