import { UsersPageService } from '../users-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ax-registered-page',
  templateUrl: './registered-page.component.html',
  styleUrls: ['./registered-page.component.scss']
})
export class RegisteredPageComponent implements OnInit {

  constructor(
    public usersPageService: UsersPageService
  ) { }

  ngOnInit() {
    this.usersPageService.getUsers();
  }

}
