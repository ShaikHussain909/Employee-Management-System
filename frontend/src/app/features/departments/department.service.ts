import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'https://localhost:44356/api/Department';  

  constructor(private http: HttpClient) { }

   getDepartments(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  createDepartment(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateDepartment(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

}
