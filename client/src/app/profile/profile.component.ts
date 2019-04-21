import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { EnrollmentService } from '../enrollment.service';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails;

  constructor(private auth: AuthenticationService, private enroll: EnrollmentService) {}
  
  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });

    this.enroll.courses().subscribe( courses => {
      console.log(courses);
    }, (err) => {
      console.error(err);
    });
  }
}
