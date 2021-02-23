import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from './navbar/navbar.component';
import {ContainerComponent} from './container/container.component';
import {EmployeeComponent} from './container/employee/employee.component';
import {RoomComponent} from './container/room/room.component';
import {CreateComponent} from './container/employee/create/create.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {RoleComponent} from './navbar/role/role.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {EmployeeCapabilityPipe} from './pipes/employee-capability.pipe';
import {RoomCapabilityPipe} from './pipes/room-capability.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {EditRoleComponent} from './navbar/role/edit-role/edit-role.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {RoomFormComponent} from './container/room/room-form/room-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ContainerComponent,
    EmployeeComponent,
    RoomComponent,
    CreateComponent,
    RoleComponent,
    EmployeeCapabilityPipe,
    RoomCapabilityPipe,
    EditRoleComponent,
    RoomFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
