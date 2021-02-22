import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Employee} from '../../../models/employee.model';
import {Subscription} from 'rxjs';
import {EmployeeService} from '../../../services/employee.service';
import {RoleService} from '../../../services/role.service';
import {Role} from '../../../models/role.model';

@Component({
    selector: 'app-employee-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
    public isLoading = false;
    private roleEvent: Subscription;
    public roles: Role[] = [];
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

    constructor(private employeeService: EmployeeService, protected roleService: RoleService) {
        this.roleEvent = this.roleService.roleEvent.subscribe((roles) => {
            this.roles = roles;
        });
    }

    ngOnInit(): void {
        this.roleService.getRoles();
    }

    public createEmployee(): void {
        this.employeeService.addEmployee(this.employee);
    }

    ngOnDestroy(): void {
        this.roleEvent.unsubscribe();
    }
}
