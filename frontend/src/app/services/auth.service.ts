import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of, tap } from "rxjs";
import { User } from "../types";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private readonly apiUrl = 'http://localhost:3000/api/auth';
   
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.isLoggedInSubject.asObservable

    constructor(private http: HttpClient) {}

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
            catchError((error) => {
                return of({ success: false, msg: error.error?.msg || 'Hibás bejelentkezési adatok'})
            })
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