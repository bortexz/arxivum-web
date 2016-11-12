import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsersService } from '../../services/users/users.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';

@Injectable()
export class HomePageGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  canActivate() {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      return Observable.from([false]);
    }

    return this.usersService.getOne(user_id);
  }
}
