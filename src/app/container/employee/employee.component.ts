import {Component, OnInit, OnDestroy, AfterViewInit, OnChanges} from '@angular/core';
import {EmployeeService} from '../../../services/employee.service';
import {Employee} from '../../../models/employee.model';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
    public employees: Employee[] | undefined;
    public editMode = false;
    public createMode = false;

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

    constructor(public employeeService: EmployeeService) {
        this.setEmployeeSubscription = this.employeeService.setEmployees.subscribe((employees: Employee[]) => {
            this.employees = employees;
        });
        this.editEmployeeSubscription = this.employeeService.editEvent.subscribe((employee) => {
            this.editMode = false;
            this.employeeService.fetchData();
        });
        this.deleteEmployeeSubscription = this.employeeService.deleteEvent.subscribe((employee: Employee) => {
            this.employeeService.fetchData();
        });

        this.addEmployeeSubscription = this.employeeService.addEvent.subscribe((employee: Employee) => {
            this.createMode = false;
        });
    }

    ngOnInit(): void {

        this.employees = this.employeeService.getEmployees();

    }

    editEmployee(employee: Employee): void {
        this.editMode = true;
        this.employee = {...employee};
    }

    addEmployee(): void {
        this.createMode = true;
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
    }


}
