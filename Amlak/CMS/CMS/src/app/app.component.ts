import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    window.localStorage.setItem('myEstateId', '1');
  }

  logout(): void {
    this.authService.logOut();
  }
}
