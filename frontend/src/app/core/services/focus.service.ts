import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';

export interface FocusSession {
  id: number;
  user_id: number;
  duration_minutes: number;
  snooze_count: number;
  status: 'working' | 'completed' | 'interrupted';
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class FocusService {
  private readonly apiUrl = `${API_BASE_URL}/api/focus-sessions`;

  constructor(private readonly http: HttpClient) {}

  start(durationMinutes: number): Observable<FocusSession> {
    return this.http.post<FocusSession>(`${this.apiUrl}/start`, {
      duration_minutes: durationMinutes,
    });
  }

  snooze(sessionId: number): Observable<FocusSession> {
    return this.http.post<FocusSession>(`${this.apiUrl}/${sessionId}/snooze`, {});
  }

  complete(sessionId: number): Observable<FocusSession> {
    return this.http.post<FocusSession>(`${this.apiUrl}/${sessionId}/complete`, {});
  }
}

