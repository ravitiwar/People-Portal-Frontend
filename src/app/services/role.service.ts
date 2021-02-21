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
    public roleUpdateEvent: EventEmitter<any> = new EventEmitter();
    public roleAddEvent: EventEmitter<any> = new EventEmitter();

    public roles: Role[] = [];

    constructor(protected http: HttpClient, protected authService: AuthService, private dataService: DataService) {
    }

    public getRoles(): void {
        this.http.get(this.dataService.getUrl('/api/role'), {headers: this.authService.getAuthHeaders()}).subscribe((res: any) => {
            this.setData(this.dataService.getResponseData(res));
            this.roleEvent.emit(this.roles);
        });
    }

    public getCapabilities(): void {
        this.http.get(this.dataService.getUrl('/api/capabilities'), {headers: this.authService.getAuthHeaders()}).subscribe((res: any) => {
            const data: [] = this.dataService.getResponseData(res);
            this.allCapabilities = [];
            data.forEach((k, v) => {
                this.allCapabilities.push(k);
            });
            this.capabilityEvent.emit(this.allCapabilities);
        });
    }

    public updateRole(role: Role): void {
        // tslint:disable-next-line:max-line-length
        this.http.put(this.dataService.getUrl('/api/role/' + role.id), role, {headers: this.authService.getAuthHeaders()}).subscribe((res: any) => {
            if (this.dataService.isResponseSuccess(res)) {
                this.roleUpdateEvent.emit(role);
                this.getRoles();
            } else {
                alert('Error while updating the role, Please try again');
            }
        });
    }

    public addRole(role: Role): void {
        // tslint:disable-next-line:max-line-length
        this.http.post(this.dataService.getUrl('/api/role'), role, {headers: this.authService.getAuthHeaders()}).subscribe((res: any) => {
            if (this.dataService.isResponseSuccess(res)) {
                this.roleAddEvent.emit(role);
                this.getRoles();
            } else {
                alert('Error while adding the role, Please try again');
            }
        });
    }

    public deleteRole(role: Role): void {
        // tslint:disable-next-line:max-line-length
        this.http.delete(this.dataService.getUrl('/api/role/' + role.id), {headers: this.authService.getAuthHeaders()}).subscribe((res: any) => {
            if (this.dataService.isResponseSuccess(res)) {
                this.getRoles();
            } else {
                alert('Error! while deletig the Role, Please try again.');
            }
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
        this.roles = [];
        data.data.forEach((role, v) => {
            this.roles.push(new Role(role));
        });
    }
}
