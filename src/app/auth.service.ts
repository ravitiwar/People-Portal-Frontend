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
        return 'http://blue-stack.local' + endpoint;
    }

    public login(email: string, password: string): void {
        this.http.post<User>(this.getUrl('/api/login'), {email, password}).subscribe((res: any) => {
            if (res.success) {
                this.user = new User(res);
                this.userLogin.emit(this.user);
                localStorage.setItem('access_token', this.user.getAccessToken() as string);
                localStorage.setItem('refresh_token', this.user.getRefreshToken() as string);
            } else {
                alert('Invalid Credentials!');
            }
        });
    }

    public isUserLoggedIn(): boolean {
        return this.user?.isUserLoggedIn() as boolean;
    }

    setUserDetails(): void {

    }

}

