import { InvitationsService } from '../../../core/invitations/invitations.service';
import * as InvitationsActions from '../../../core/invitations/invitations.actions';
import { FoldersService } from '../../../core/folders/folders.service';
import { FilesService } from '../../../core/files/files.service';
import * as FoldersActions from '../../../core/folders/folders.actions';
import { AppError } from '../../../core/common/errors.actions';
import { AbstractModal, ModalConfig } from '../abstract-modal';
import * as ModalsActions from '../../../core/modals/modals.actions';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import { Observable } from 'rxjs/Observable';
// import { NameFormState } from '../../../core/modals/reducers/name-form-modal.reducer';
import {
  FormBuilder,
  FormControl,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import {validateEmail} from '../../../utils/form-validators/email.validator';

const R = require('ramda');
const debug = require('debug')('arxivum:modals:name-form')

interface InputModalConfig extends ModalConfig {
  inputName: string;
  inputValue: (currentModal?) => string;
  submitFn: () => Observable<Action>;
  validators: [ValidatorFn]; // Default is required
  errors: [string] ;
}

@Component({
  selector: 'ax-input-modal',
  templateUrl: 'input-modal.component.html',
  styleUrls: ['input-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputModalComponent extends AbstractModal implements OnInit, OnDestroy {

  errorMessages = {
    required: 'This field is required',
    validateEmail: 'Invalid email'
  }

  getError () {
    const errors = Object.keys(this.inputSubject.value.errors);
    if (errors.length > 0) return this.errorMessages[errors[0]]; // Always get just first
    return ''
  }

  config: {[key: string]: InputModalConfig } = {
    // new folder
    [ModalsActions.NEW_FOLDER]: {
      title: 'Create new folder',
      submitText: 'Create',
      inputName: 'Name',
      errors: ['required'],
      validators: [Validators.required],
      inputValue: () => '',
      submitFn: () => {
        return this.foldersApi.create({
          name: this.inputSubject.value.value,
          parent: this.currentModal.value.parent
        })
        .map(() => new FoldersActions.ReloadList())
        .catch(() => Observable.of(new AppError('Cannot create new folder')))
      }
    },

    // update folder
    [ModalsActions.UPDATE_FOLDER]: {
      title: 'Update folder',
      submitText: 'Update',
      inputName: 'Name',
      errors: ['required'],
      validators: [Validators.required],
      inputValue: (currentModal) => {
        return currentModal.folder.name;
      },
      submitFn: () => {
        return this.foldersApi.update(
          this.currentModal.value.folder._id,
          {name: this.inputSubject.value.value }
        )
        .map(() => new FoldersActions.ReloadList())
        .catch(() => Observable.of(new AppError('Cannot update new folder')))
      }
    },

    // update file
    [ModalsActions.UPDATE_FILE]: {
      title: 'Update file',
      submitText: 'Update',
      inputName: 'Name',
      errors: ['required'],
      validators: [Validators.required],
      inputValue: (currentModal) => {
        return currentModal.file.name;
      },
      submitFn: () => {
        return this.filesApi.update(
          this.currentModal.value.file._id,
          {name: this.inputSubject.value.value }
        )
        .map(() => new FoldersActions.ReloadList())
        .catch(() => Observable.of(new AppError('Cannot update file')))
      }
    },

    // Invite user
    [ModalsActions.INVITE_USER]: {
      title: 'Invite user',
      submitText: 'Send invitation',
      inputName: 'Email',
      errors: ['required', 'validateEmail'],
      validators: [Validators.required, validateEmail],
      inputValue: () => '',
      submitFn: () => {
        return this.invitationsApi.create(this.inputSubject.value.value)
          .map(() => new InvitationsActions.ReloadList())
          .catch(() => Observable.of(new AppError('Cannot send invitation')))
      }
    }
  }

  inputSubject: BehaviorSubject<FormControl> = new BehaviorSubject(this.formBuilder.control(''));
  inputSubscription: Subscription;

  errors$ = this.getConfigPropertyObservable('errors');
  inputName$ = this.getConfigPropertyObservable('inputName');

  constructor(
    private formBuilder: FormBuilder,
    private filesApi: FilesService,
    private foldersApi: FoldersService,
    private invitationsApi: InvitationsService,
    @Inject(Store) store: Store<AppState>
  ) {
    super(store);
  }

  ngOnInit () {
    super.ngOnInit();
    this.inputSubscription = this.currentModal
      .filter(Boolean)
      .filter(modal => R.contains(modal.type, R.keys(this.config)))
      .subscribe(currentModal => {
        const modalConfig = <InputModalConfig>this.config[currentModal.type];
        this.inputSubject.next(this.formBuilder.control(
          modalConfig.inputValue(currentModal), modalConfig.validators)
        )
      })
  }

  ngOnDestroy () {
    super.ngOnDestroy();
    if (!this.inputSubscription.closed) this.inputSubscription.unsubscribe();
  }

  onOpenChange () {
    this.cancel();
  }
}
