import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {User} from './user.model';
import {DataService} from './data.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public user: User | undefined;
    public userLogin: EventEmitter<any> = new EventEmitter();

    constructor(private http: HttpClient, private dataService: DataService) {
    }

    private getUrl(endpoint: string): string {
        return this.dataService.getUrl(endpoint);
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
        return (this.getAccessToken() !== null);
    }

    setUserDetails(): void {

    }

    public getAccessToken(): string {
        return localStorage.getItem('access_token') as string;
    }

    public getRefreshToken(): string {
        return localStorage.getItem('refresh_token') as string;
    }

    public getAuthHeaders(): HttpHeaders {
        return new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('Authorization', 'Bearer ' + this.getAccessToken());
    }

}

