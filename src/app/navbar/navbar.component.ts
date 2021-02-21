import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../services/user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RoleService} from '../services/role.service';
import {Role} from '../models/role.model';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public isUserLoggedIn: boolean | undefined;
    public user: User | undefined;
    public roles: Role[] = [];
    protected roleEvent: Subscription;


    constructor(private authService: AuthService, private modalService: NgbModal, protected roleService: RoleService) {
        this.authService.userLogin.subscribe((user) => {
            this.user = user;
            this.isUserLoggedIn = true;
        });
        this.roleEvent = this.roleService.roleEvent.subscribe((roles: Role[]) => {
            this.roles = roles;
        });

    }

    ngOnInit(): void {
        this.roleService.getRoles();
    }

    launchRoleModel(content: any): void {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    OnDestroy(): void {
        this.authService.userLogin.unsubscribe();
        this.roleEvent.unsubscribe();
    }

}
