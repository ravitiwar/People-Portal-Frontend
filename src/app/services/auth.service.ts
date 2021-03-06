import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, ObservableInput, Subscription} from 'rxjs';
import {User} from './user.model';
import {DataService} from './data.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user: User | undefined;
  public userLogin: EventEmitter<any> = new EventEmitter();
  public userLoginFailed: EventEmitter<any> = new EventEmitter();
  public userLogout: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private dataService: DataService) {
  }

  private getUrl(endpoint: string): string {
    return this.dataService.getUrl(endpoint);
  }

  public login(email: string, password: string): void {
    this.http.post<User>(this.getUrl('/api/login'), {email, password}).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('access_token', res.data.access_token as string);
        localStorage.setItem('refresh_token', res.data.refresh_token as string);
        this.getUserDetails();
      } else {
        this.userLoginFailed.emit('Login failed');
        alert('Invalid Credentials!');
      }
    });
  }

  public isUserLoggedIn(): boolean {
    return (this.getAccessToken() !== null);
  }

  getUserDetails(): void {
    this.http.get<User>(this.dataService.getUrl('/api/user'), {headers: this.getAuthHeaders()}).subscribe((res: any) => {
      if (res.success) {
        this.user = new User(res.data);
        this.userLogin.emit(this.user);
      }
    }, (err) => {
      this.handelErrors(err);
    });
  }

  public getAccessToken(): string {
    return localStorage.getItem('access_token') as string;
  }

  public getRefreshToken(): string {
    return localStorage.getItem('refresh_token') as string;
  }

  public logout(): void {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
    this.userLogout.emit('User Logged out.');
  }

  public getAuthHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', '*')
      .set('Accept', 'application/json, text/plain')
      .set('Authorization', 'Bearer ' + this.getAccessToken());
  }

  public userCan(cap: string): boolean {
    return ((this.user !== undefined) && (this.user.capabilities.indexOf(cap) !== -1));
  }

  public handelErrors(err: HttpErrorResponse): void {
    switch (err.status) {
      case 401:
        this.logout();
        break;
    }
  }
}

