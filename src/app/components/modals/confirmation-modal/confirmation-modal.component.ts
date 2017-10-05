import { InvitationsService } from '../../../core/invitations/invitations.service';
import { FilesService } from '../../../core/files/files.service';
import { Component, Inject } from '@angular/core';
import { AppState } from '../../../app.reducers';
import { AppError } from '../../../core/common/errors.actions';
import * as FoldersActions from '../../../core/folders/folders.actions';
import * as InvitationsActions from '../../../core/invitations/invitations.actions';
import { FoldersService } from '../../../core/folders/folders.service';
import { Observable } from 'rxjs/Rx';
import { Action, Store } from '@ngrx/store';
import { AbstractModal, ModalConfig } from '../abstract-modal';
import * as ModalsActions from '../../../core/modals/modals.actions';

interface ConfirmationModalConfig extends ModalConfig {
  message: string;
  submitFn: () => Observable<Action>;
}

@Component({
  selector: 'ax-confirmation-modal',
  templateUrl: 'confirmation-modal.component.html',
  styleUrls: ['confirmation-modal.component.scss']
})
export class ConfirmationModalComponent extends AbstractModal {

  message$ = this.getConfigPropertyObservable('message');

  config: {[key: string]: ConfirmationModalConfig} = {
    [ModalsActions.DELETE_FOLDER]: {
      title: 'Delete folder',
      submitText: 'Delete',
      message: 'When deleting a folder, all the children folders and files will also be deleted. Are you sure to continue?',
      submitFn: () => {
        return this.foldersApi.delete(this.currentModal.value.id)
          .map(() => new FoldersActions.ReloadList())
          .catch(() => Observable.of(new AppError('Cannot delete folder')))
      }
    },
    // Delete file
    [ModalsActions.DELETE_FILE]: {
      title: 'Delete file',
      submitText: 'Delete',
      message: 'Are you sure to delete this file?',
      submitFn: () => {
        return this.filesApi.remove(this.currentModal.value.file._id)
          .map(() => new FoldersActions.ReloadList())
          .catch(() => Observable.of(new AppError('Cannot delete file')))
      }
    },

    // Delete invitation
    [ModalsActions.DELETE_INVITATION]: {
      title: 'Delete invitation',
      submitText: 'Delete',
      message: `If you delete this invitation, the user will not be able to register.
        If the user is already registered, it will still have access.`,
      submitFn: () => {
        return this.invitationsApi.remove(this.currentModal.value.id)
          .map(() => new InvitationsActions.ReloadList())
          .catch(() => Observable.of(new AppError('Cannot delete invitation')))
      }
    }
  }

  constructor (
    public foldersApi: FoldersService,
    public filesApi: FilesService,
    public invitationsApi: InvitationsService,
    @Inject(Store) store: Store<AppState>
  ) {
    super(store);
  }
}
