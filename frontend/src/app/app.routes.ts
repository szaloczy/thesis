import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { inject, NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
    { path:"", redirectTo: 'login', pathMatch: "full"},
    { path:"login", component: UserLoginComponent },
    { path:"register", component: UserRegisterComponent },
    { path:"home", component: HomeComponent, canActivate: [ () => inject(AuthService).preventUnauthorizedAccess() ] },
    { path:"admin", component: AdminComponent, canActivate: [ () => inject(AuthService).preventUnauthorizedAccess() ] },
    { path:"dashboard", component: DashboardComponent, canActivate: [ () => inject(AuthService).preventUnauthorizedAccess() ]},
    { path: '**', redirectTo: "login" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }