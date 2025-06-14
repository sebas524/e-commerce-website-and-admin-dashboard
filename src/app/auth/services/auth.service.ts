import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));
  private httpClient = inject(HttpClient);

  checkStatusResource = rxResource({
    loader: () => this.checkAuthStatus(),
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    if (this._user()) return 'authenticated';
    return 'unauthenticated';
  });

  user = computed<User | null>(() => {
    return this._user();
  });

  token = computed<string | null>(this._token);

  register(
    fullName: string,
    email: string,
    password: string
  ): Observable<boolean> {
    return this.httpClient
      .post<AuthResponse>(`${environment.baseUrl}/auth/register`, {
        fullName: fullName,
        email: email,
        password: password,
      })
      .pipe(
        tap((resp) => {
          this.successfulLoginHandler(resp);
        }),
        map(() => {
          return true;
        }),
        catchError((error: any) => {
          console.log(error);

          return this.unsuccessfulLoginHandler(error);
        })
      );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.httpClient
      .post<AuthResponse>(`${environment.baseUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((resp) => {
          this.successfulLoginHandler(resp);
        }),
        map(() => {
          return true;
        }),
        catchError((error: any) => {
          return this.unsuccessfulLoginHandler(error);
        })
      );
  }

  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }
    return this.httpClient
      .get<AuthResponse>(`${environment.baseUrl}/auth/check-status`, {
        // headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        tap((resp) => {
          this.successfulLoginHandler(resp);
        }),
        map(() => {
          return true;
        }),
        catchError((error: any) => {
          return this.unsuccessfulLoginHandler(error);
        })
      );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('unauthenticated');
    localStorage.removeItem('token');
  }

  private successfulLoginHandler(resp: AuthResponse) {
    this._user.set(resp.user);
    this._authStatus.set('authenticated');
    this._token.set(resp.token);
    localStorage.setItem('token', resp.token);
  }

  private unsuccessfulLoginHandler(error: any) {
    this.logout();
    return of(false);
  }
}
