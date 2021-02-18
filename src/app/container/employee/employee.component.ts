import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../employee.service';
import {Employee} from '../../../models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public employees: Employee[] | undefined;
  public editMode = false;
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

  constructor(public employeeService: EmployeeService) {
    this.employeeService.setEmployees.subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
    this.employeeService.editEvent.subscribe((employee) => {
      this.editMode = false;
      this.employeeService.fetchData();
    });
  }

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
  }

  editEmployee(employee: Employee): void {
    this.editMode = true;
    this.employee = {...employee};
    console.log(this.employee);
  }

}
