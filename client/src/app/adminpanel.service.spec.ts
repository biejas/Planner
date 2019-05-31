import { TestBed, inject, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule } from '@angular/forms';
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
import { AdminpanelService, NewSubject } from './adminpanel.service';

import { APP_BASE_HREF } from '@angular/common';
import { of } from 'rxjs/observable/of';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'enroll', component: EnrollmentComponent, canActivate: [AuthGuardService] },
  { path: 'admin', component: AdminpanelComponent, canActivate: [AuthGuardService] }
];

describe('AdminpanelService', () => {
  let adminpanelService: AdminpanelService;
  let loginComponent: LoginComponent;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
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
      {provide: APP_BASE_HREF, useValue: '/apihttp://localhost:4200/api/admin'}
    ]
  }).compileComponents();

  adminpanelService = TestBed.get(AdminpanelService);
  loginComponent = TestBed.get(AuthenticationService);

}));

afterEach(() => {
  TestBed.resetTestingModule();
});

afterAll(() => {
  TestBed.resetTestingModule();
});

  it('should be created', () => {
    expect(adminpanelService).toBeTruthy();
  });

  describe('getEnrollmentResult', () => {
    it('should return a collection of subjects', () => {
      const userResponse = [
        {
          subjectname: 'Przedmiot 1',
          group: '1a',
          participants: []
        }
      ];
      let response;
      spyOn(adminpanelService, 'getEnrollmentResult').and.returnValue(of(userResponse));

      adminpanelService.getEnrollmentResult().subscribe(res => {
        response = res;
      });

      expect(response).toEqual(userResponse);
    });
  });

  describe('addSubject', () => {
    it('should add a subject', () => {
      const userResponse: NewSubject = {
          name: 'PrzedmiotTesotwy',
          groups: []
        };
      let response;
      spyOn(adminpanelService, 'addSubject').and.returnValue(of(userResponse));

      adminpanelService.addSubject(userResponse).subscribe(res => {
        response = res;
      });

      expect(response).toEqual(userResponse);
    });
  });

  describe('finishEnrollment', () => {
    it('should finish enrollment', () => {
      const userResponse = "Zapisy skończone!";
      let response;
      spyOn(adminpanelService, 'finishEnrollment').and.returnValue(of(userResponse));

      adminpanelService.finishEnrollment().subscribe(res => {
        response = res;
      });
      expect(response).toEqual(userResponse);
    });
  });

  describe('startEnrollment', () => {
    it('should start enrollment', () => {
      const userResponse = "Rozpoczęto zapisy!";
      let response;
      spyOn(adminpanelService, 'startEnrollment').and.returnValue(of(userResponse));

      adminpanelService.startEnrollment().subscribe(res => {
        response = res;
      });
      expect(response).toEqual(userResponse);
    });
  });

  describe('deleteElement', () => {
    it('should delete a subject', () => {
      const userResponse= {
          name: 'PrzedmiotTesotwy',
          groups: []
        };
      let response;
      spyOn(adminpanelService, 'deleteElement').and.returnValue(of(userResponse));

      adminpanelService.deleteElement(userResponse).subscribe(res => {
        response = res;
      });

      expect(response).toEqual(userResponse);
    });
  });
});
