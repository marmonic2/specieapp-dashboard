import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor() { }

  active = 1;

  // eslint-disable-next-line class-methods-use-this
  ngOnInit(): void {
  }
}
