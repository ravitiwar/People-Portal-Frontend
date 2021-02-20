import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../services/user.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public isUserLoggedIn: boolean | undefined;
    public user: User | undefined;

    constructor(private authService: AuthService) {
        this.authService.userLogin.subscribe((user) => {
            this.user = user;
            this.isUserLoggedIn = true;
        });
    }

    ngOnInit(): void {
    }

    OnDestroy(): void {
        this.authService.userLogin.unsubscribe();
    }

}
