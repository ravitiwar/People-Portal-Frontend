import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User | undefined;
  public userLogin: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  private getUrl(endpoint: string): string {
    return 'http://10.10.2.62:8000' + endpoint;
  }

  public login(email: string, password: string): void {
    this.http.post<User>(this.getUrl('/api/login'), {email, password}).subscribe((res: any) => {
      if (res.success) {
        this.user = new User(res);
        this.userLogin.emit(new User(res));
      } else {
        alert('Invalid Credentials!');
      }
    });
  }

  public isUserLoggedIn(): boolean {
    return this.user?.isUserLoggedIn() as boolean;
  }

}

