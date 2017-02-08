import { InviteUserModalComponent } from '../../components/invite-user-modal/invite-user-modal.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ax-users-admin-page',
  templateUrl: './users-admin-page.component.html',
  styleUrls: ['./users-admin-page.component.scss']
})
export class UsersAdminPageComponent implements OnInit {

  users$ = this.store.select(state => state.admin_users);
  invitations$ = this.store.select(state => state.invitations);

  @ViewChild(InviteUserModalComponent) inviteUserModal: InviteUserModalComponent;

  constructor(private store: Store<AppState>) { }

  ngOnInit() { }

  inviteUser (email) {

  }
}
