import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignInAdminModel } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenHelper: JwtHelperService;

  private _isLoggedIn: boolean;
  public get getLoggedIn(): boolean {
    return this._isLoggedIn;
  }
  public set setLoggedIn(v: boolean) {
    this._isLoggedIn = v;
  }

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.tokenHelper = new JwtHelperService();

    if (this.getToken() && this.getToken().length) {
      this._isLoggedIn = true;
    } else {
      this._isLoggedIn = false;
    }
  }

  public getToken(): string {
    return this.cookieService.get('CMS_AMLK_Token');
  }

  public getAdminAccount(): any {
    if (
      this.cookieService.get('CMS_AMLK_Token') &&
      this.cookieService.get('CMS_AMLK_Token').length
    ) {
      return this.tokenHelper.decodeToken(
        this.cookieService.get('CMS_AMLK_Token')
      );
    } else {
      return null;
    }
  }

  public checkIsExpireTokenInJwt(): boolean {
    return this.tokenHelper.isTokenExpired(this.getToken());
  }

  public isAdminTokenExpired(): boolean {
    if (
      !this.cookieService.get('CMS_AMLK_Token') &&
      !this.cookieService.get('CMS_AMLK_Token').length
    ) {
      return this.tokenHelper.isTokenExpired(
        this.cookieService.get('CMS_AMLK_Token')
      );
    } else {
      return false;
    }
  }

  setAdminToken(token: string): void {
    if (this.getToken() !== null || this.getToken() !== '') {
      this.cookieService.delete('CMS_AMLK_Token');
    }

    this.cookieService.set(
      'CMS_AMLK_Token',
      token,
      1,
      '/',
      environment.cookieDomain,
      false,
      'Lax'
    );
  }

  public logOut(): void {
    this.cookieService.delete('CMS_AMLK_Token');
    this.router.navigate(['authenticate']).then(() => {
      this._isLoggedIn = false;
    });
  }

  public signInAdmin(data: SignInAdminModel): Observable<string> {
    const url = environment.dataApiUrl + `/Registery/SignInAdmin`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient
      .post<string>(url, data, { headers: headers })
      .pipe((res) => {
        const p = res || null;
        return p;
      });
  }
}
