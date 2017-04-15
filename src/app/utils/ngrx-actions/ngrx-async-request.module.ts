import { NgrxAsyncRequest } from './ngrx-async-request';
import { Action, Store } from '@ngrx/store';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { Actions } from '@ngrx/effects';
import { Inject, Injectable, NgModule, OnDestroy } from '@angular/core';

@NgModule({
  providers: [
    NgrxAsyncRequest
  ]
})
export class NgrxAsyncRequestModule {
  constructor(private asyncReq: NgrxAsyncRequest) {}
}
