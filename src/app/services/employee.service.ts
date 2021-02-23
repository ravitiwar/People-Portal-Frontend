import {EventEmitter, Injectable} from '@angular/core';
import {Employee} from '../models/employee.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {DataService} from './data.service';
import {AuthService} from './auth.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    public employees: Employee[] = [];
    public setEmployees: EventEmitter<any> = new EventEmitter();
    public editEvent: EventEmitter<Employee> = new EventEmitter();
    public deleteEvent: EventEmitter<Employee> = new EventEmitter();
    public addEvent: EventEmitter<Employee> = new EventEmitter();
    protected allCapabilities: [] = [];


    constructor(private http: HttpClient, private dataService: DataService, private authService: AuthService) {
        this.fetchData();
    }

    public fetchData(): void {
        this.http.get(this.dataService.getUrl('/api/employee'), {headers: this.getHeaders()}).subscribe((res: any) => {
            if (this.dataService.isResponseSuccess(res)) {
                this.setData(this.dataService.getResponseData(res));
            } else {
                alert('Error while loading the employee');
            }
        });
    }

    getEmployees(): Employee[] | undefined {
        return this.employees;
    }

    private setData(data: { current_page: number, data: [] }): void {
        this.employees = [];
        data.data.forEach((employee, index) => {
            this.employees.push(new Employee(employee));
        });
        this.setEmployees.emit(this.employees);
    }

    addEmployee(employee: Employee): void {
      // tslint:disable-next-line:max-line-length
        this.http.post(this.dataService.getUrl('/api/employee'), employee, {headers: this.authService.getAuthHeaders()}).subscribe((res: any) => {
            if (this.dataService.isResponseSuccess(res)) {
                const emp: Employee = new Employee(this.dataService.getResponseData(res));
                this.employees.push(emp);
                this.addEvent.emit(emp);
            } else {
                alert('Error while saving employee. Check if Email id is already exists');
            }
        });
    }

    editEmployee(employee: Employee): void {
        this.http.put(this.dataService.getUrl('/api/employee/' + employee.id), employee, {headers: this.getHeaders()}).subscribe((res) => {
            this.editEvent.emit(employee);
        });
    }

    deleteEmployee(employee: Employee): void {
        this.http.delete(this.dataService.getUrl('/api/employee/' + employee.id), {headers: this.getHeaders()}).subscribe((res: any) => {
            if (this.dataService.isResponseSuccess(res)) {
                this.deleteEvent.emit(employee);
            }
        });
    }

    private getHeaders(): HttpHeaders {
        return this.authService.getAuthHeaders();
    }
}
