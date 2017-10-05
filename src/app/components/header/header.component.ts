import { HeaderService } from './header.service';
import { AuthenticationState } from '../../core/authentication/authentication.reducer';
import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'ax-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  authenticated$ = this.headerService.authenticated$;
  player$ = this.headerService.player$;

  constructor(
    private headerService: HeaderService
  ) { }
}
