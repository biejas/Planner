import { Component, OnInit } from '@angular/core';
import { NewSubject, Group, AdminpanelService } from '../adminpanel.service';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  private enrollResponse;

  subjects = [];

  newSubject : NewSubject = {
    name : '',
    groups : new Array
  }

  enrollmentResult = [];

  constructor(private adminpanel : AdminpanelService,  private enrollservice: EnrollmentService) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses (){
    this.enrollservice.courses().subscribe(subs =>{
      this.subjects=subs;
    });
  }

  addGroup() {
    this.newSubject.groups.unshift({
      coursetype : '',
      group : '',
      teacher : '',
      maxparticipants: 0,
      participants : []
    });
  }

  addSubject() {
    this.adminpanel.addSubject(this.newSubject).subscribe(str=> {
    }, (err) => {
      console.error(err);
    });
    this.getCourses();
  }

  deleteElement(element){
    this.adminpanel.deleteElement(element).subscribe(str=> {
    }, (err) => {
      console.error(err);
    });
    this.getCourses();
  }

  deleteCourse(element){
    this.adminpanel.deleteCourse(element).subscribe(str=> {
    }, (err) => {
      console.error(err);
    });
    this.getCourses();
  }

  finishEnrollment() {
    this.adminpanel.finishEnrollment().subscribe(str=> {
      this.enrollResponse = str;
    }, (err) => {
      console.error(err);
    });
  }

  startEnrollment() {
    this.adminpanel.startEnrollment().subscribe(str=> {
      this.enrollResponse = str;
    }, (err) => {
      console.error(err);
    });
  }

  getEnrollmentResult(){
    this.adminpanel.getEnrollmentResult().subscribe(str=> {
      this.enrollmentResult = str;
    }, (err) => {
      console.error(err);
    });
  }



}
