import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

@Injectable()
export class EnrollmentService{

    constructor(private http: HttpClient, private router: Router) {}

    public courses(): Observable<any>{
        return this.http.get(`api/courses`);
    }
}