import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = `${environment.apiUrl}/Employee`;

  constructor(private http: HttpClient) {}

  getEmployees(
    pageNumber: number,
    pageSize: number,
    search?: string,
    departmentId?: number
  ) {

    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    if (search) {
      params = params.set('search', search);
    }

    if (departmentId) {
      params = params.set('departmentId', departmentId);
    }

    return this.http.get(this.apiUrl, { params });
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateEmployee(id: number, employee: any) {
  return this.http.put(`${this.apiUrl}/${id}`, employee);
}

addEmployee(employee: any) {
  return this.http.post(this.apiUrl, employee);
}

getDepartments() {
    return this.http.get<any[]>(`${environment.apiUrl}/Department`);
  }

  getDesignations() {
    return this.http.get<any[]>(`${environment.apiUrl}/Designation`);
  }

}