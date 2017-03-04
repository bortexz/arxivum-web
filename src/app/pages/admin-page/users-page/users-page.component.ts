import { AppState } from '../../../app.reducers';
import { Store } from '@ngrx/store';
import { UsersActions } from '../../../core/users/users.actions';
import { IUser } from '../../../core/users/users.interfaces';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ax-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  users$: Observable<IUser[]>;

  constructor(
    private store: Store<AppState>,
    private usersActions: UsersActions
  ) { }

  ngOnInit() {
    this.users$ = this.store.select(state => state.admin_users.users);
    this.store.dispatch(this.usersActions.getUsers());
  }

}
