import {Component} from '@angular/core';
import {AuthService} from './auth.service';
import {User} from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent {
  public isUserLoggedIn = false;

  constructor(public authService: AuthService) {
    this.authService.userLogin.subscribe((user: User) => {
      this.isUserLoggedIn = user.isUserLoggedIn();
    });
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
    this.authService.setUserDetails();
  }

  OnInit(): void {

  }

  OnDestroy(): void {
    this.authService.userLogin.unsubscribe();
  }
}
