import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';

export interface GameResult {
  id: number;
  user_id: number;
  game_type: string;
  time_seconds: number;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameResultService {
  private readonly apiUrl = `${API_BASE_URL}/api/game-results`;

  constructor(private readonly http: HttpClient) {}

  store(timeSeconds: number, gameType = 'schulte_table'): Observable<GameResult> {
    return this.http.post<GameResult>(this.apiUrl, {
      game_type: gameType,
      time_seconds: timeSeconds,
    });
  }
}

