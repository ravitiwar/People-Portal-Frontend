import {Component, Inject, OnInit} from '@angular/core';
import {RoleService} from '../../../services/role.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Role} from '../../../models/role.model';

@Component({
    selector: 'app-edit-role',
    templateUrl: './edit-role.component.html',
    styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {
    public isLoading = false;
    public allCaps: string[] = [];
    protected capEvent: Subscription;
    public isEditMode = true;

    constructor(private roleService: RoleService, @Inject(MAT_DIALOG_DATA) public role: Role) {
        if (!role.id) {
            this.isEditMode = false;
        }
        this.capEvent = this.roleService.capabilityEvent.subscribe((caps: string[]) => {
            this.allCaps = caps;
        });
    }

    ngOnInit(): void {
        this.roleService.getCapabilities();
    }

    updateRole(): void {
        this.roleService.updateRole(this.role);
    }

    addRole(): void {
        this.roleService.addRole(this.role);
    }

}
