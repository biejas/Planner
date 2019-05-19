import { Component, OnInit } from '@angular/core';
import { NewSubject, Group, AdminpanelService } from '../adminpanel.service';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  newSubject : NewSubject = {
    name : '',
    groups : new Array
  }

  constructor(private adminpanel : AdminpanelService,  private enrollservice: EnrollmentService) { }

  ngOnInit() {
  }

  addGroup() {
    this.newSubject.groups.push({
      coursetype : '',
      group : '',
      teacher : '',
      maxparticipants: 0
    });
  }

  addSubject() {
    console.log(this.newSubject);
    this.adminpanel.addSubject(this.newSubject).subscribe(str=> {
    }, (err) => {
      console.error(err);
    });
  }

}
