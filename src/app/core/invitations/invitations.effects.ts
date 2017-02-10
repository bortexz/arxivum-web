import { InvitationsActions } from './invitations.actions';
import { InvitationsService } from './invitations.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class InvitationsEffects {
  @Effect()
  getInvitations$ = this.actions$
    .ofType(InvitationsActions.GET_INVITATIONS)
    .switchMap(() => this.invitationsService.getAll())
    .map(res => this.invitationActions.getInvitationsSuccess(res))
    .catch(err => Observable.of(this.invitationActions.getInvitationsError(err)));

  @Effect()
  createInvitation$ = this.actions$
    .ofType(InvitationsActions.CREATE_INVITATION)
    .switchMap(action => this.invitationsService.create(action.payload.email))
    .map(res => this.invitationActions.createInvitationSuccess(res))
    .catch(err => Observable.of(this.invitationActions.createInvitationError(err)));

  @Effect()
  createInvitationSuccess$ = this.actions$
    .ofType(InvitationsActions.CREATE_INVITATION_SUCCESS)
    .map(() => this.invitationActions.getInvitations());

  constructor(
    private actions$: Actions,
    private invitationActions: InvitationsActions,
    private invitationsService: InvitationsService
  ) {}
}
