import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Employee} from '../../../models/employee.model';
import {EmployeeService} from '../../../services/employee.service';
import {Form} from '@angular/forms';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
    public isLoading = false;
    protected editEvent: Subscription;
    @Input() employee: Employee =
        new Employee(
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

    constructor(private employeeService: EmployeeService) {
        this.editEvent = this.employeeService.editEvent.subscribe((employee: Employee) => {
            this.isLoading = false;
        });
    }

    ngOnInit(): void {
    }

    saveEmployee(): void {
        this.isLoading = true;
        this.employeeService.editEmployee(this.employee);
    }

    ngOnDestroy(): void {
        this.editEvent.unsubscribe();
    }

}
