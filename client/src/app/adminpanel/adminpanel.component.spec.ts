import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from '../app.component';
import { ProfileComponent } from '../profile/profile.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { HomeComponent } from '../home/home.component';
import { EnrollmentComponent } from '../enrollment/enrollment.component';
import { AdminpanelComponent } from '../adminpanel/adminpanel.component';

import { AuthenticationService } from '../authentication.service';
import { AuthGuardService } from '../auth-guard.service';
import { EnrollmentService } from '../enrollment.service';
import { WebsocketService } from '../websocket.service';
import { AdminpanelService } from '../adminpanel.service';

import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'enroll', component: EnrollmentComponent, canActivate: [AuthGuardService] },
  { path: 'admin', component: AdminpanelComponent, canActivate: [AuthGuardService] }
];
describe('AdminpanelComponent', () => {
  let component: AdminpanelComponent;
  let fixture: ComponentFixture<AdminpanelComponent>;

  beforeEach(() => TestBed.configureTestingModule({
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
      {provide: APP_BASE_HREF, useValue: 'http://localhost:4200/api/admin'}
    ]
  }).compileComponents()
);

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
  
  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
