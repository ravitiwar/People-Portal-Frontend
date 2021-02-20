import {EventEmitter, Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';
import {Role} from '../models/role.model';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    public allCapabilities: [] = [];
    public capabilityEvent: EventEmitter<any> = new EventEmitter<any>();
    public roleEvent: EventEmitter<any> = new EventEmitter();
    public roles: Role[] = [];

    constructor(protected http: HttpClient, protected authService: AuthService, private dataService: DataService) {
    }

    public getRoles(): void {
        if (!this.allCapabilities.length) {
            this.http.get(this.dataService.getUrl('/api/role'), {headers: this.authService.getAuthHeaders()}).subscribe((res: any) => {
                this.setData(this.dataService.getResponseData(res));
                this.roleEvent.emit(this.roles);
            });
        }
    }

    public getCapabilities(): void {
        this.http.get(this.dataService.getUrl('/api/capabilities'), {headers: this.authService.getAuthHeaders()}).subscribe((res: any) => {
            const data: [] = this.dataService.getResponseData(res);
            data.forEach((k, v) => {
                this.allCapabilities.push(k);
            });
            this.capabilityEvent.emit(this.allCapabilities);
        });
    }

    private setData(data: {
        current_page: number,
        data: [{
            id: number,
            title: string,
            capabilities: [string]
        }];
        first_page_url: string,
        from: number,
        last_page: number,
        last_page_url: string,
        next_page_url: string | null,
        path: string,
        per_page: number,
        prev_page_url: string | null,
        to: number,
        total: number
    }): void {
        data.data.forEach((role, v) => {
            this.roles.push(new Role(role));
        });
    }
}
