import { Observable } from 'rxjs/Rx';
import { AppError } from '../common/errors.actions';
import * as InvitationsActions from './invitations.actions';
import { InvitationsService } from './invitations.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class InvitationsEffects {

  @Effect()
  reload$ = this.actions$
    .ofType(InvitationsActions.RELOAD_LIST)
    .switchMap(action => this.invitationsApi.getAll()
      .map(list => new InvitationsActions.UpdateInvitationsList(list))
      .catch(err => Observable.of(new AppError('Cannot reload invitations list')))
    )

  constructor(
    private actions$: Actions,
    private invitationsApi: InvitationsService
  ) {}
}
