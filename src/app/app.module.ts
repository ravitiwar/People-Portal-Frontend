import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from './container/employee/employee.component';
import { RoomComponent } from './container/room/room.component';
import { ListComponent } from './container/employee/list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ContainerComponent,
    EmployeeComponent,
    RoomComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
