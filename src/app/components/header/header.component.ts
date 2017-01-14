import { AppState } from '../../app.reducers';
import { AuthenticationActions } from '../../services/authentication/authentication.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthenticationState } from '../../services/authentication/authentication.reducer';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'ax-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authenticated$: Observable<AuthenticationState>;

  constructor(
    private store: Store<AppState>,
    private authActions: AuthenticationActions
  ) {
    this.authenticated$ = store.select(state => state.authenticated);
  }

  ngOnInit() {
  }
}
