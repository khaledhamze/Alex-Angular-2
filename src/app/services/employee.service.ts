import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EMPLOYEES, SERVER_ADDRESS } from '../app-constants/url-constants';
import { IEmployee } from '../models/employee.model';
import { CoreApiService } from './core-api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: CoreApiService) { }

  getAllEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(`${SERVER_ADDRESS}${EMPLOYEES}`);
  }

  getEmployeeById(employeeId: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${SERVER_ADDRESS}${EMPLOYEES}/${employeeId}`);
  }

  saveEmployee(employee: IEmployee) {
    return this.http.post<IEmployee>(`${SERVER_ADDRESS}${EMPLOYEES}`, employee);
  }

  updateEmployee(employee: IEmployee) {
    return this.http.put<IEmployee>(`${SERVER_ADDRESS}${EMPLOYEES}/${employee.id}`, employee);
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete<IEmployee>(`${SERVER_ADDRESS}${EMPLOYEES}/${employeeId}`);
  }

  getEmployeeDetailsByFNameAndLName(firstName: string, lastName: string) {
    var qParams = new HttpParams().set('fName', firstName).set('lName', lastName);
    return this.http.get<IEmployee[]>(`${SERVER_ADDRESS}${EMPLOYEES}`, qParams)
  }
}
