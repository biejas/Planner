import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { EnrollmentService } from '../enrollment.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  constructor(private auth: AuthenticationService, private enroll: EnrollmentService, private websocket: WebsocketService) { }

  ngOnInit() {
    this.enroll.courses().subscribe( courses => {
      console.log(courses);
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
