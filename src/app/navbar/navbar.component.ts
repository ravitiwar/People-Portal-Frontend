import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../services/user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RoleService} from '../services/role.service';
import {RoleComponent} from './role/role.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
    public isUserLoggedIn: boolean | undefined;
    public user: User | undefined;

    constructor(private authService: AuthService, protected roleService: RoleService, public dialog: MatDialog) {
        this.authService.userLogin.subscribe((user) => {
            this.user = user;
            this.isUserLoggedIn = true;
        });


    }

    ngOnInit(): void {
        this.roleService.getRoles();
    }

    launchRoleModel(): void {
        const dialogRef = this.dialog.open(RoleComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    ngOnDestroy(): void {
        this.authService.userLogin.unsubscribe();
    }

}
