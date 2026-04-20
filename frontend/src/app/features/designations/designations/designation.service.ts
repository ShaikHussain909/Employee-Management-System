import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  private apiUrl = 'https://localhost:44356/api/Designation';

  constructor(private http: HttpClient) { }

  getDesignations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addDesignation(designation: any): Observable<any> {
    return this.http.post(this.apiUrl, designation);
  }

  updateDesignation(id: number, designation: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, designation);
  }

  deleteDesignation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}