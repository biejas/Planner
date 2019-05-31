import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService) { }

  canActivate() {
    return this.auth.isAdmIn();
  }
}
