import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { LoginUserDTO, User } from '../types';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = 'http://localhost:3000/api/auth';

    // Signal változók a felhasználói adat kezelésére
    currentUserSig = signal<User | undefined | null>(undefined);

    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.isLoggedInSubject.asObservable();

    private roleSubject = new BehaviorSubject<string | null>(null);
    role$ = this.roleSubject.asObservable();

    http = inject(HttpClient);
    router = inject(Router);

    // Felhasználó regisztrációja
    register(userData: User) { 
        return this.http.post(this.apiUrl + '/signup', userData);
    }

    // Bejelentkezés
    login(data: User) {
        return this.http.post<LoginUserDTO>(this.apiUrl + '/login', data, { withCredentials: true })
            .pipe(
                tap(response => {
                    this.getUserData(); // Miután sikeres a bejelentkezés, betöltjük a felhasználói adatokat
                })
            );
    }

    // Kilépés
    logout() {
        this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe(() => {
            this.currentUserSig.set(null); // Kilépéskor töröljük a felhasználói adatokat
            this.router.navigate(['/login']);
            window.location.reload();
        });
    }

    // Felhasználói adatokat kér le (beleértve a szerepkört)
    getUserData() {
        return this.http.get<User>(`${this.apiUrl}/me`, { withCredentials: true })
            .pipe(
                tap(response => {
                    this.currentUserSig.set(response);  // Az egész felhasználói objektumot eltároljuk
                    this.roleSubject.next(response.role);  // A szerepkört külön is eltároljuk
                    this.isLoggedInSubject.next(true);  // Bejelentkezés állapot frissítése
                }),
                catchError(() => {
                    this.isLoggedInSubject.next(false);  // Ha a kérés hibát ad vissza, akkor kijelentkezett
                    return of(null);
                })
            );
    }

    // Szerepkör lekérése
    getUserRole() {
        return this.http.get<{role: string}>(`${this.apiUrl}/get-role`, { withCredentials: true })
            .pipe( 
                tap(response => {
                    this.roleSubject.next(response.role);
                }),
                map(response => response.role)
            );
    }

    // Bejelentkezett felhasználó ellenőrzése
    isLoggedIn() {
        return this.http.get<{ success: boolean }>(`${this.apiUrl}/auth-check`, { withCredentials: true })
            .pipe(
                map(response => response.success),
                catchError(() => of(false))
            );
    }

    getCurrentUser(): Observable<User> {
        return this.http.get<User>(`http://localhost:3000/api/users/me`, { withCredentials: true });
      }
}
