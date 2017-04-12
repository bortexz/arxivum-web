import { ModalsActions } from '../../../core/modals/modals.actions';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import { Observable } from 'rxjs/Observable';
import { NameFormState } from '../../../core/modals/reducers/name-form-modal.reducer';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'ax-name-form-modal',
  templateUrl: './name-form-modal.component.html',
  styleUrls: ['./name-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameFormModalComponent implements OnInit, OnDestroy {

  nameControl$: BehaviorSubject<FormControl> = new BehaviorSubject(null);
  nameControlSubscription: Subscription;

  options$: Observable<NameFormState>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private modalsActions: ModalsActions
  ) { }

  ngOnInit() {
    this.options$ = this.store.select(state => state.modals.nameForm);

    this.nameControlSubscription = this.options$.filter(Boolean).map(options =>
      this.formBuilder.control((options.entity || {}).name || '', [Validators.required]))
      .subscribe(this.nameControl$);

  }

  ngOnDestroy() {
    if (!this.nameControlSubscription.closed) this.nameControlSubscription.unsubscribe();
  }

  public save () {
    this.store.dispatch(
      this.modalsActions.saveNameFormEntity(
        this.nameControl$.getValue().value
      )
    );
  }

  public cancel () {
    this.store.dispatch(this.modalsActions.closeNameFormModal());
  }

}
