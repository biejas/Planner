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
    console.log(this.newSubject);
    this.adminpanel.addSubject(this.newSubject).subscribe(str=> {
    }, (err) => {
      console.error(err);
    });
    this.getCourses();
  }

  deleteElement(element){
    console.log(element);
    this.adminpanel.deleteElement(element).subscribe(str=> {
    }, (err) => {
      console.error(err);
    });
    this.getCourses();
  }

  deleteCourse(element){
    console.log(element);
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
}
