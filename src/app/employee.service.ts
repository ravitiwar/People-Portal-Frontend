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


  constructor(private http: HttpClient, private dataService: DataService, private authService: AuthService) {
    this.http.get(this.getUrl('/api/employee'), {headers: this.getHeaders()}).subscribe((res: any) => {
      if (this.dataService.isResponseSuccess(res)) {
        this.setData(this.dataService.getResponseData(res));
      } else {
        alert('Error while loading the employee');
      }
    });
  }

  private getUrl(endpoint: string): string {
    return 'http://10.10.2.62:8000' + endpoint;
  }

  getEmployees(): Employee[] | undefined {
    return this.employees;
  }

  private setData(data: { current_page: number, data: [] }): void {
    data.data.forEach((employee, index) => {
      this.employees.push(new Employee(employee));
    });
    this.setEmployees.emit(this.employees);
  }


  addEmployee(employee: Employee): void {

  }

  editEmployee(employee: Employee): void {

  }

  deleteEmployee(employee: Employee): void {

  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Bearer ' + this.authService.getAccessToken());
  }
}
