import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {User} from './services/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent {
  public isUserLoggedIn = true;
  protected userLoginEvent: Subscription;
  protected userLogOutEvent: Subscription;

  constructor(public authService: AuthService) {
    this.userLoginEvent = this.authService.userLogin.subscribe((user: User) => {
      this.isUserLoggedIn = true;
    });

    if (this.authService.isUserLoggedIn()) {
      this.authService.getUserDetails();
    } else {
      this.isUserLoggedIn = false;
    }

    this.userLogOutEvent = this.authService.userLogout.subscribe((res) => {
      this.isUserLoggedIn = false;
    });
  }

  OnInit(): void {

  }

  OnDestroy(): void {
    this.userLoginEvent.unsubscribe();
    this.userLogOutEvent.unsubscribe();
  }
}
