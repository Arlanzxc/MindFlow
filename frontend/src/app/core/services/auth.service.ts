import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, computed, signal } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { API_BASE_URL } from '../api.config';

export interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient;
  private readonly apiUrl = API_BASE_URL;
  private readonly userSignal = signal<User | null>(null);
  private readonly tokenSignal = signal<string | null>(localStorage.getItem('mindflow_token'));

  readonly currentUser: Signal<User | null> = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => Boolean(this.tokenSignal()));

  constructor(http: HttpClient) {
    this.http = http;

    const cachedUser = localStorage.getItem('mindflow_user');
    if (cachedUser) {
      this.userSignal.set(JSON.parse(cachedUser) as User);
    }
  }

  csrfCookie(): Observable<unknown> {
    return this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  }

  register(payload: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Observable<AuthResponse> {
    return this.csrfCookie().pipe(
      switchMap(() => this.http.post<AuthResponse>(`${this.apiUrl}/api/register`, payload, { withCredentials: true })),
      tap((response) => this.persistSession(response)),
    );
  }

  login(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.csrfCookie().pipe(
      switchMap(() => this.http.post<AuthResponse>(`${this.apiUrl}/api/login`, payload, { withCredentials: true })),
      tap((response) => this.persistSession(response)),
    );
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/api/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this.clearSession()),
    );
  }

  private persistSession(response: AuthResponse): void {
    this.userSignal.set(response.user);
    this.tokenSignal.set(response.token);
    localStorage.setItem('mindflow_token', response.token);
    localStorage.setItem('mindflow_user', JSON.stringify(response.user));
  }

  private clearSession(): void {
    this.userSignal.set(null);
    this.tokenSignal.set(null);
    localStorage.removeItem('mindflow_token');
    localStorage.removeItem('mindflow_user');
  }
}

