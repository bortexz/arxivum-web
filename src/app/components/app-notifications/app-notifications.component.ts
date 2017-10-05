import { RemoveNotification } from '../../core/common/notifications.actions';
import { RemoveError } from '../../core/common/errors.actions';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ax-app-notifications',
  templateUrl: './app-notifications.component.html',
  styleUrls: ['./app-notifications.component.scss']
})
export class AppNotificationsComponent implements OnInit {

  errors$
  notifications$

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.errors$ = this.store.select(state => state.common.errors)
    this.notifications$ = this.store.select(state => state.common.notifications)
  }

  closeError(index) {
    this.store.dispatch(new RemoveError(index));
  }

  closeNotification(index) {
    this.store.dispatch(new RemoveNotification(index));
  }

}
