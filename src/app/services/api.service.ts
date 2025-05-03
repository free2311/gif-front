import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFact(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/fact');
  }

  getGif(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/gif`, { params: { query } });
  }

  getHistory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/history`);
  }
}
