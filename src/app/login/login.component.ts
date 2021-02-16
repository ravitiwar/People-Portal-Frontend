import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  get errorMessage(): string {
    return this.errorMessage;
  }

  set errorMessage(value: string) {
    this.errorMessage = value;
  }


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  public login(loginForm: NgForm): any {
    this.authService.login(loginForm.value.email, loginForm.value.password);
  }

}
