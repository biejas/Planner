import { AdminAuthGuardService } from './admin-auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';

import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { EnrollmentService } from './enrollment.service';
import { WebsocketService } from './websocket.service';
import { AdminpanelService } from './adminpanel.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'enroll', component: EnrollmentComponent, canActivate: [AuthGuardService] },
  { path: 'admin', component: AdminpanelComponent, canActivate: [AuthGuardService, AdminAuthGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EnrollmentComponent,
    AdminpanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    EnrollmentService,
    WebsocketService,
    AdminpanelService,
    AdminAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
