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

  private choices: Object= {};

  private subjects: Object = {};
  private subjectsArray: Array<String> = [];

  constructor(private auth: AuthenticationService, private enrollservice: EnrollmentService, private websocket: WebsocketService) { }

  enroll() {
    this.enrollservice.enroll(this.choices).subscribe();
  }

  ngOnInit() {
    this.enrollservice.courses().subscribe( subs => {
      subs.forEach(sub => {
        this.subjects[sub.name] = sub.courses;
        this.choices[sub.name] = {choice1: ""};
      });

      this.subjectsArray=Object.keys(this.subjects);

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
