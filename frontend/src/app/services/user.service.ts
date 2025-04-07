import { inject, Injectable } from '@angular/core';
import { AccessTokenDTO, LoginDTO, UserDTO } from '../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  signup(user: UserDTO) {
    return this.http.post<UserDTO>('/api/auth/signup', user);
  }

  login(data: LoginDTO) {
    return this.http.post<AccessTokenDTO>('/api/auth/login', data);
  }
}
