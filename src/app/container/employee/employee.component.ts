import {Component, OnInit, OnDestroy, AfterViewInit, OnChanges} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../models/employee.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateComponent} from './create/create.component';
import {RoleService} from '../../services/role.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  public employees: Employee[] = [];
  public editMode = false;
  public createMode = false;
  public displayedColumns = ['ID', 'name', 'email', 'position', 'team', 'phone', 'action'];

  private setEmployeeSubscription: Subscription;
  private editEmployeeSubscription: Subscription;
  private deleteEmployeeSubscription: Subscription;
  private addEmployeeSubscription: Subscription;

  public employee: Employee = new Employee(
    {
      id: 0,
      name: '',
      emp_id: '',
      email: '',
      position: '',
      team: '',
      role_id: 0,
      phone: '',
    }
  );

  constructor(public employeeService: EmployeeService, public authService: AuthService, public dialog: MatDialog) {
    this.setEmployeeSubscription = this.employeeService.setEmployees.subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
    this.editEmployeeSubscription = this.employeeService.editEvent.subscribe((employee) => {
      this.editMode = false;
      this.employeeService.fetchData();
      this.dialog.closeAll();
    });
    this.deleteEmployeeSubscription = this.employeeService.deleteEvent.subscribe((employee: Employee) => {
      this.employeeService.fetchData();
    });

    this.addEmployeeSubscription = this.employeeService.addEvent.subscribe((employee: Employee) => {
      this.createMode = false;
      this.employeeService.fetchData();
    });
  }

  ngOnInit(): void {
    this.employeeService.fetchData();
  }

  editEmployee(employee: Employee): void {
    this.dialog.open(CreateComponent, {data: employee});
  }

  addEmployee(): void {
    this.dialog.open(CreateComponent, {
      data: new Employee({
        id: 0,
        name: '',
        emp_id: '',
        email: '',
        position: '',
        team: '',
        role_id: 2,
        phone: '',
      })
    });
  }

  deleteEmployee(employee: Employee): void {
    if (confirm('Are you sure ?')) {
      this.employeeService.deleteEmployee(employee);
    }
  }

  ngOnDestroy(): void {
    this.setEmployeeSubscription.unsubscribe();
    this.editEmployeeSubscription.unsubscribe();
    this.deleteEmployeeSubscription.unsubscribe();
    this.addEmployeeSubscription.unsubscribe();
  }


}
