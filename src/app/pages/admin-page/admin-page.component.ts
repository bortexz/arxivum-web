import { AuthenticationState } from '../../core/authentication/authentication.reducer';
import { IInvitation } from '../../core/invitations/invitations.interfaces';
import { IUser } from '../../core/users/users.interfaces';
import { Observable } from 'rxjs/Rx';
import { UsersActions } from '../../core/users/users.actions';
import { InvitationsActions } from '../../core/invitations/invitations.actions';
import { InviteUserModalComponent } from '../../components/modals/invite-user-modal/invite-user-modal.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ax-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  users$: Observable<IUser[]>;
  invitations$: Observable<IInvitation[]>;

  authenticated$: Observable<AuthenticationState>;

  @ViewChild(InviteUserModalComponent) inviteUserModal: InviteUserModalComponent;

  constructor(
    private store: Store<AppState>,
    private invitationsActions: InvitationsActions,
    private usersActions: UsersActions
  ) { }

  ngOnInit() {
    this.users$ = this.store.select(state => state.admin_users.users);
    this.invitations$ = this.store.select(state => state.invitations.invitations);

    this.authenticated$ = this.store.select(state => state.authenticated);

    this.store.dispatch(this.invitationsActions.getInvitations());
    this.store.dispatch(this.usersActions.getUsers());
  }

  inviteUser (email) {
    this.store.dispatch(this.invitationsActions.createInvitation(email));
  }
}
