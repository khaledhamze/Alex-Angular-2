import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreApiService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, queryParams?: HttpParams): Observable<T> {
    return this.http.get<T>(url, { params: queryParams });
  }

  put<T>(url: string, data: T): Observable<T> {
    return this.http.put<T>(url, data);
  }

  post<T>(url: string, data: T): Observable<T> {
    return this.http.post<T>(url, data);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
