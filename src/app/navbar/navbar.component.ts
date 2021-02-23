import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../services/user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RoleService} from '../services/role.service';
import {RoleComponent} from './role/role.component';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isUserLoggedIn = false;
  public user: User | undefined;
  public logoutEvent: Subscription;
  public logInEvent: Subscription;
  public displayRole = false;

  constructor(public authService: AuthService, protected roleService: RoleService, public dialog: MatDialog) {
    this.logInEvent = this.authService.userLogin.subscribe((user: User) => {
      this.user = user;
      this.isUserLoggedIn = true;
    });
    this.logoutEvent = this.authService.userLogout.subscribe(() => {
      this.isUserLoggedIn = false;
    });
  }

  ngOnInit(): void {
  }

  launchRoleModel(): void {
    this.dialog.open(RoleComponent);
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.logInEvent.unsubscribe();
    this.logoutEvent.unsubscribe();
  }

}
