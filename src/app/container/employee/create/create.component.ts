import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Employee} from '../../../models/employee.model';
import {Subscription} from 'rxjs';
import {EmployeeService} from '../../../services/employee.service';
import {RoleService} from '../../../services/role.service';
import {Role} from '../../../models/role.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Room} from '../../../models/room.model';

@Component({
  selector: 'app-employee-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  public isLoading = false;
  private roleEvent: Subscription;
  private employeeAddEvent: Subscription;
  private employeeUpdateEvent: Subscription;
  public roles: Role[] = [];
  public editMode = false;

  constructor(@Inject(MAT_DIALOG_DATA) public employee: Employee, private employeeService: EmployeeService, protected roleService: RoleService, public dialog: MatDialogRef<CreateComponent>) {
    this.roleEvent = this.roleService.roleEvent.subscribe((roles) => {
      this.roles = roles;
    });
    this.employeeAddEvent = this.employeeService.addEvent.subscribe((emp) => {
      this.dialog.close();
    });

    this.employeeUpdateEvent = this.employeeService.editEvent.subscribe((emp) => {
      this.dialog.close();
    });
  }

  ngOnInit(): void {
    this.roleService.getRoles();
    this.editMode = (this.employee.id !== undefined && this.employee.id > 0);
  }

  public createEmployee(): void {
    this.employeeService.addEmployee(this.employee);
  }

  editEmployee(): void {
    this.isLoading = true;
    this.employeeService.editEmployee(this.employee);
  }

  ngOnDestroy(): void {
    this.roleEvent.unsubscribe();
    this.employeeAddEvent.unsubscribe();
  }
}
