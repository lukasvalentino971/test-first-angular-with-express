import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'http://localhost:3000/auth';
  constructor(private http:HttpClient) {}
    login(user: any){
      return this.http.post(`${this.apiUrl}/login`, user);
    }
   }
