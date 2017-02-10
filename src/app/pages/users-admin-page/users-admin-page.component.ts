import { UsersActions } from '../../core/users/users.actions';
import { InvitationsActions } from '../../core/invitations/invitations.actions';
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

  users$ = this.store.select(state => state.admin_users.users);
  invitations$ = this.store.select(state => state.invitations.invitations);

  @ViewChild(InviteUserModalComponent) inviteUserModal: InviteUserModalComponent;

  constructor(
    private store: Store<AppState>,
    private invitationsActions: InvitationsActions,
    private usersActions: UsersActions
  ) { }

  ngOnInit() {
    this.store.dispatch(this.invitationsActions.getInvitations());
    this.store.dispatch(this.usersActions.getUsers());
  }

  inviteUser (email) {
    this.store.dispatch(this.invitationsActions.createInvitation(email));
  }
}
