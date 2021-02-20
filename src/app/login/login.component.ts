import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    public isLoading = false;
    public loginEvent: Subscription;

    constructor(private authService: AuthService) {
        this.loginEvent = this.authService.userLogin.subscribe((res) => {
            this.isLoading = false;
        });
    }

    ngOnInit(): void {
    }

    public login(loginForm: NgForm): any {
        this.isLoading = true;
        this.authService.login(loginForm.value.email, loginForm.value.password);
    }

    ngOnDestroy(): void {
        this.loginEvent.unsubscribe();
    }

}
