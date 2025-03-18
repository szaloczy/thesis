import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { User } from "../types";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private readonly apiUrl = 'http://localhost:3000/api/auth';
    currentUserSig = signal<any | undefined | null>(undefined);

    private usernameSubject = new BehaviorSubject<string | null>(null);
    username$ = this.usernameSubject.asObservable();

    constructor(private http: HttpClient) {}

    getUser() {
        return this.http.get<{user: any}>(this.apiUrl + "/user");
    }

    register(userData: User): Observable<any> {
        return this.http.post(this.apiUrl + "/signup", userData);
    }

    login(data: any): Observable<any> {
        return this.http.post<{data: {token: string, user: {username: string}}}>(this.apiUrl + "/login", data).
            pipe(tap((result) => {
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('username', result.data.user.username);
                this.usernameSubject.next(result.data.user.username);
            }));
    }

    logout(): void {
        localStorage.removeItem('token')
        localStorage.removeItem('username');
        this.usernameSubject.next(null);
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    getLoggedUsername(): string {
        return localStorage.getItem('username') || '';
    }
} 