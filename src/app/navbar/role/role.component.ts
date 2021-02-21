import {Component, OnDestroy, OnInit} from '@angular/core';
import {Role} from '../../models/role.model';
import {Subscription} from 'rxjs';
import {RoleService} from '../../services/role.service';
import {EditRoleComponent} from './edit-role/edit-role.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['title', 'capabilities', 'actions'];
    public roles: Role[] = [];
    public capabilities: string[] = [];
    protected roleEvent: Subscription;
    protected capabilityEvent: Subscription;
    public isLoading = true;

    constructor(private roleService: RoleService, protected dialog: MatDialog) {
        this.roleEvent = this.roleService.roleEvent.subscribe((roles: Role[]) => {
            this.roles = roles;
            this.isLoading = false;
        });

        this.capabilityEvent = this.roleService.capabilityEvent.subscribe((capabilities) => {
            this.capabilities = capabilities;
        });
    }

    ngOnInit(): void {
        this.roleService.getCapabilities();
        this.roleService.getRoles();
    }

    ngOnDestroy(): void {
        this.roleEvent.unsubscribe();
        this.capabilityEvent.unsubscribe();
    }

    onEditRole(role: Role): void {
        this.dialog.open(EditRoleComponent, {data: role});
    }

    onaddRole(): void {
        this.dialog.open(EditRoleComponent, {data: new Role({id: 0, title: '', capabilities: ['']})});
    }

    onDeleteRole(role: Role): void {
        if (confirm('Are you sure ?')) {
            this.roleService.deleteRole(role);
        }
    }


}
