import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SignInAdminModel } from '../shared/models/user.model';
import { HelperService } from '../shared/services/Helper.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loader: boolean;

  username = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]);

  loginForm: FormGroup = this.formBuilder.group({
    username: this.username,
    password: this.password,
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private helper: HelperService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLoginClick(): void {
    this.loader = true;

    let signIn = new SignInAdminModel({
      password: this.loginForm.value.password,
      username: this.loginForm.value.username,
    });

    this.authService.signInAdmin(signIn).subscribe((token) => {
      this.loader = false;
      if (token && token.length) {
        this.authService.setAdminToken(token);
        this.router.navigate(['dashboard']).then(() => {
          this.authService.setLoggedIn = true;
        });
      } else {
        this.helper.notify('خطا', 'سیستم نمیتواند ورود کند', 3000);
      }
    });
  }

  goToURL(): void {
    window.location.href = environment.mainSite;
  }
}
