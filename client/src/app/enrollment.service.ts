import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

import {AuthenticationService} from './authentication.service';

export class EnrollmentDetails {
    choices: [SubjectChoice]
}

export interface SubjectChoice {
    subject: String,
    group: String
}

@Injectable()
export class EnrollmentService{

    constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) {}

    public courses(): Observable<any>{
        return this.http.get(`api/courses`);
    }

    public enroll(enrollmentDetails: any): Observable<any>{
        return this.http.post(`api/enroll`,enrollmentDetails);
    }
}
