import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";
import { User } from "../types";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private readonly apiUrl = 'http://localhost:3000/api/auth';
   
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.isLoggedInSubject.asObservable

    private roleSubject = new BehaviorSubject<string | null>(null);
    role$ = this.roleSubject.asObservable();

    http = inject(HttpClient);
    router = inject(Router);

    register(userData: User): Observable<any> {
        return this.http.post(this.apiUrl + "/signup", userData)
        .pipe(
            catchError((error) => {
                return of({ success: false, msg: error.error?.msg || 'Hiba történt a regisztráció során'})
            })
        );;
    }

    login(data: any): Observable<any> {
        return this.http.post<{success: boolean, token: string}>(this.apiUrl + "/login", data, { withCredentials: true})
        .pipe(
            tap( response => {
                if(response.success) {
                    this.getUserRole().subscribe();
                }
            }),
            catchError((error) => {
                return of({ success: false, msg: error.error?.msg || 'Hibás bejelentkezési adatok'})
            })
        );
    }

    logout() {
        this.http.post(`${this.apiUrl}/logout`, {}).subscribe(() => {
          this.router.navigate(['/login']);
        });
    }

    getUserRole(): Observable<string | null> {
        return this.http.get<{role: string}>(`${this.apiUrl}/get-role`, {withCredentials: true})
        .pipe( 
            tap(response => {
                this.roleSubject.next(response.role);
            }),
            map(response => response.role)
        );
    }

    isLoggedIn(): Observable<boolean> {
        return this.http.get<{ success: boolean }>(`${this.apiUrl}/auth-check`, { withCredentials: true })
          .pipe(
            map(response => response.success),
            catchError(() => of(false))
          );
      }
} 