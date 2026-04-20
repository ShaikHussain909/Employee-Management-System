import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
  
  logout() {
  localStorage.removeItem('token');
}

getToken(): string | null {
  return localStorage.getItem('token');
}

getRole(): string | null {
  const token = this.getToken();
  if (!token) return null;

  const payload = token.split('.')[1];
  const decoded = JSON.parse(atob(payload));

  // Adjust this key if backend uses different claim name
  return decoded['role'] || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
}

isLoggedIn(): boolean {
  return !!this.getToken();
}
}