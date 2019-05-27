import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { EnrollmentService, EnrollmentDetails, SubjectChoice } from '../enrollment.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  private coursesaved;
  private choices: Object= {};

  private subjects: Object = {};
  private subjectsArray: Array<String> = [];

  private priorityNumbers: Array<Number> = [];

  constructor(private auth: AuthenticationService, private enrollservice: EnrollmentService, private websocket: WebsocketService) { }

  enroll() {
    this.enrollservice.enroll(this.choices).subscribe(str=> {
      this.coursesaved = str;
    }, (err) => {
      console.error(err);
    });
  }

  ngOnInit() {
    this.enrollservice.courses().subscribe( subs => {
      subs.forEach(sub => {
        this.subjects[sub.name] = sub.courses;
      });

      this.subjectsArray=Object.keys(this.subjects);

      const values = Object.keys(this.subjects).map(key => this.subjects[key]);

      var priorityAmount = 0;
      for(var i=0; i<values.length; i++){
        priorityAmount+=values[i].length;
      }

      for(var i=0; i<priorityAmount; i++){
          this.priorityNumbers[i]=i;
          this.choices[i] = {subject: "", group: ""};
      }
    }, (err) => {
      console.error(err);
    });

    this.auth.profile().subscribe(user => {
      this.choices['useremail'] = user.user.email;
    }, (err) => {
      console.error(err);
    });


    const sock = this.websocket.connect();
    sock.on('hello', () =>{
      console.log('got hello');
      sock.emit('hey');
    });
  }

}
