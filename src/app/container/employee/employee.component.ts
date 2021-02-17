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

  constructor(public employeeService: EmployeeService) {
    this.employeeService.setEmployees.subscribe((employees: Employee[]) => {
      this.employees = {...employees};
    });
  }

  ngOnInit(): void {

  }

  
}
