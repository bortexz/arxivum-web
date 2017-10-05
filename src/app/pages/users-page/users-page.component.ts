import { UsersPageService } from './users-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ax-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  constructor(
    public usersPageService: UsersPageService
  ) { }

  ngOnInit() {
  }

}
