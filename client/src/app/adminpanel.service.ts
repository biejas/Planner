import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export interface Group {
  coursetype : String,
  group : String,
  teacher : String,
  maxparticipants : Number
}

export interface NewSubject {
  name : String,
  groups : any
}

@Injectable()
export class AdminpanelService {

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) { }

  public addSubject(newSubject : NewSubject): Observable<any>{
    return this.http.post(`api/subjects`,newSubject);
  }

  public finishEnrollment(): Observable<any>{
      return this.http.post(`api/admin`, {});
  }

  public startEnrollment(): Observable<any>{
      return this.http.put(`api/admin`, {});
  }

  public deleteElement(element): Observable<any>{
    return this.http.put(`api/subjects`,element);
  }

  public deleteCourse(element): Observable<any>{
    return this.http.put(`api/courses`,element);
  }
}
