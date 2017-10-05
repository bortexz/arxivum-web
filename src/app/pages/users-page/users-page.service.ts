import * as InvitationsActions from '../../core/invitations/invitations.actions';
import { InvitationsService } from '../../core/invitations/invitations.service';
import * as ModalsActions from '../../core/modals/modals.actions';
import { UpdateUsersList } from '../../core/users/users.actions';
import { AppError } from '../../core/common/errors.actions';
import { UsersService } from '../../core/users/users.service';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersPageService {
  users$ = this.store.select(state => state.users);
  invitations$ = this.store.select(state => state.invitations)
    .map(list => {
      if (list) return list.sort((a, b) => a.fulfilled ? 1 : 0)
    });

  getUsers () {
    this.usersApi.getAll().subscribe(
      data => this.store.dispatch(new UpdateUsersList(data)),
      err => this.store.dispatch(new AppError('Cannot load users'))
    )
  }

  resendInvitation (id) {
    // TEMPORARY
    this.invitationsApi.resend(id).subscribe();
  }

  getInvitations () {
    this.store.dispatch(new InvitationsActions.ReloadList());
  }

  inviteUser () {
    this.store.dispatch(new ModalsActions.InviteUser());
  }

  deleteInvitation (id) {
    this.store.dispatch(new ModalsActions.DeleteInvitation(id))
  }

  constructor (
    private store: Store<AppState>,
    private usersApi: UsersService,
    private invitationsApi: InvitationsService
  ) {}
}
