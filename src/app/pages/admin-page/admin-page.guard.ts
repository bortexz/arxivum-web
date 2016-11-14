import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

/**
 * Get the user id info will be used as the guard to access the home page. HomePage is protected.
 */
@Injectable()
export class AdminPageGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      this.router.navigate(['/login']);
      return Observable.from([false]);
    }

    return this.usersService.getOne(user.id)
      .map(res => {
        if (res && res.admin) {
          return true;
        }
        this.router.navigate(['/home']); // If user but not admin, go to Home
        return false;
      })
      .catch(err => {
        this.router.navigate(['/login']);
        return Observable.throw(err);
      });
  }
}
