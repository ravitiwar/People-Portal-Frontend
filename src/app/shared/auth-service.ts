import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {

  }
  login(email: string, password: string) {
    this.http.post('');
  }
  private geturl(endpoint: string) {
    return 'http://10.10.2.62:8000/'+endpoinnt;
  }
}
