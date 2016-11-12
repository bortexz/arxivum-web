import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';

/**
 * Get the user id info will be used as the guard to access the home page. HomePage is protected.
 */
@Injectable()
export class HomePageGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate() {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      this.router.navigate(['/login']);
      return Observable.from([false]);
    }

    return this.usersService.getOne(user_id)
      .map(res => {
        if (res) {
          return true;
        }
        return false;
      })
      .catch(err => {
        this.router.navigate(['/login']);
        return Observable.throw(err);
      });
  }
}
