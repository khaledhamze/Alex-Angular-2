import { Injectable } from '@angular/core';
import { DEPARTMETNS, SERVER_ADDRESS } from '../app-constants/url-constants';
import { CoreApiService } from './core-api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IDepartment } from '../models/department.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: CoreApiService) { }

  getAllDepartments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(`${SERVER_ADDRESS}${DEPARTMETNS}`)
      .pipe(map(deps => deps));
  }

  addDepartment(department: IDepartment): Observable<IDepartment> {
    return this.http.post<IDepartment>(`${SERVER_ADDRESS}${DEPARTMETNS}`, department);
  }

  deleteDepartment(id: number): Observable<string> {
    return this.http.delete<string>(`${SERVER_ADDRESS}${DEPARTMETNS}/${id}`);
  }

  updateDepartment(department: IDepartment): Observable<IDepartment> {
    return this.http.put<IDepartment>(`${SERVER_ADDRESS}${DEPARTMETNS}/${department.id}`, department);
  }

  getDepartmentDetailsByDepartmentName(departmentName: string): Observable<IDepartment[]> {
    var qParams = new HttpParams().set('name', departmentName);
    return this.http.get<IDepartment[]>(`${SERVER_ADDRESS}${DEPARTMETNS}`, qParams);
  }
}
