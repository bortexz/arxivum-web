import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';

/**
 * The logic is the following: If we ARE authenticated, then go to /home
 */
@Injectable()
export class LoginPageGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return Observable.from([true]);
    }

    return this.usersService.getOne(user.id)
      .map(res => {
        if (res) {
          this.router.navigate(['/folder']);
          return false;
        }

        return true;
      })
      .catch(err => {
        return Observable.from([true]); // If error when user, then /login
      });
  }
}
