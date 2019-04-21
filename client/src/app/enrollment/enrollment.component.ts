import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  constructor(private auth: AuthenticationService, private enroll: EnrollmentService) { }

  ngOnInit() {
    this.enroll.courses().subscribe( courses => {
      console.log(courses);
    }, (err) => {
      console.error(err);
    });
  }

}
