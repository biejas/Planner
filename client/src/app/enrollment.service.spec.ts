import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
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
import { EnrollmentService, EnrollmentDetails } from './enrollment.service';
import { WebsocketService } from './websocket.service';
import { AdminpanelService } from './adminpanel.service';

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

describe('EnrollmentService', () => {
  let enrollService: EnrollmentService;
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
      {provide: APP_BASE_HREF, useValue: '/apihttp://localhost:4200/api/enroll'}
    ]
  }).compileComponents();

  enrollService = TestBed.get(EnrollmentService);
  loginComponent = TestBed.get(AuthenticationService);

}));

afterEach(() => {
  TestBed.resetTestingModule();
});

afterAll(() => {
  TestBed.resetTestingModule();
});

  it('should be created', () => {
    const service: EnrollmentService = TestBed.get(EnrollmentService);
    expect(service).toBeTruthy();
  });

  describe('enroll', () => {
    it('should send student enrollment', () => {
      const details: EnrollmentDetails = {choices: [{subject: 'Przedmiot 1', group: '1a'}]};
      const userResponse = "Wysłano!";
      let response;
      spyOn(enrollService, 'enroll').and.returnValue(of(userResponse));

      enrollService.enroll(details).subscribe(res => {
        response = res;
      });
      expect(response).toEqual(userResponse);
    });
  });


  describe('courses', () => {
    it('should return a collection of courses', () => {
      const userResponse = [
        {
          name: 'Przedmiot 1',
          courses: [
            {
              coursetype: 'lab',
              group: '1a',
              teacher: 'Jan Kowalski',
              participants: [],
              maxparticipants: 2
            }
          ]
        }
      ];
      let response;
      spyOn(enrollService, 'courses').and.returnValue(of(userResponse));

      enrollService.courses().subscribe(res => {
        response = res;
      });

      expect(response).toEqual(userResponse);
    });
  });



});
