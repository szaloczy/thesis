import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { User } from '../types';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private readonly apiUrl = 'http://localhost:3000/api/auth';

    http = inject(HttpClient);
    router = inject(Router);

    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.isLoggedInSubject.asObservable();

    register(userData: User): Observable<any> { return this.http.post(this.apiUrl + '/signup', userData)}

    login(data: User): Observable<any> { return this.http.post<{success: boolean, token: string, user: User}>(this.apiUrl + '/login', data, { withCredentials: true})}

    logout() {
        this.http.post(`${this.apiUrl}/logout`, {}, {withCredentials: true}).subscribe(() => {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            this.isLoggedInSubject.next(false);
            this.router.navigate(['/login']);
        });
    }

    isAuthenticated(): Observable<any> { return this.http.get<{ authenticated: boolean}>(`${this.apiUrl}/auth-check`, { withCredentials: true })}

    setLoginState(state: boolean) {
        this.isLoggedInSubject.next(state);
    }
} 