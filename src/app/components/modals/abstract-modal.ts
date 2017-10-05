import * as ModalsActions from '../../core/modals/modals.actions';
import { OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs/Rx';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';

const R = require('ramda');

export interface ModalConfig {
  title: string;
  submitText?: string;
  submitFn?: () => Observable<Action>; // optional, in case other type of bvehavior is needed.
}

// Abstract class that handles the state of a modal coming from redux
export abstract class AbstractModal implements OnInit, OnDestroy {
  abstract config: {[key: string]: ModalConfig };

  private modalActionsSub: Subscription;
  public currentModal: BehaviorSubject<any> = new BehaviorSubject(null);
  public shouldDisplay$: Observable<boolean> = this.currentModal
    .map(current => {
      return current ? R.contains(current.type, R.keys(this.config)) : false
    });

  public submitText$ = this.getConfigPropertyObservable('submitText')
  public title$ = this.getConfigPropertyObservable('title')
  public actionEntity$ = this.currentModal
    .filter(Boolean)
    .filter(current => R.contains(current.type, R.keys(this.config)))


  ngOnInit () {
    this.modalActionsSub = this.store.select(state => state.modals).subscribe(this.currentModal);
  }

  ngOnDestroy() {
    if (!this.modalActionsSub.closed) this.modalActionsSub.unsubscribe();
  }

  public onOpenChange (open) {
    if (!open) {
      this.cancel();
    }
  }

  public cancel () {
    this.store.dispatch(new ModalsActions.CloseModal());
  }

  public onSubmit () {
    this.config[this.currentModal.value.type]
      .submitFn()
      .finally(() => this.store.dispatch(new ModalsActions.CloseModal()))
      .subscribe(action => this.store.dispatch(action))
  }

  public getConfigPropertyObservable (prop) {
    return this.currentModal
      .filter(Boolean)
      .filter(current => R.contains(current.type, R.keys(this.config)))
      .map(current => typeof this.config[current.type][prop] === 'function' ?
        this.config[current.type][prop](current) :
        this.config[current.type][prop]
      );
  }

  constructor (
    public store: Store<AppState>
  ) {}
}
