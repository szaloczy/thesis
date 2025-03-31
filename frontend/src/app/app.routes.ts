import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path:"", redirectTo: 'login', pathMatch: "full"},
    { path:"login", component: UserLoginComponent },
    { path:"register", component: UserRegisterComponent },
    { path:"home", component: HomeComponent,  canActivate: [AuthGuard] },
    { path:"admin", component: AdminComponent, canActivate: [AuthGuard] },
    { path:"dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: "login" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }