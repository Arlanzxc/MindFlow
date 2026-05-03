import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';

export interface AiChatResponse {
  persona: 'neutral_robot';
  reply: string;
}

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private readonly apiUrl = `${API_BASE_URL}/api/ai/chat`;

  constructor(private readonly http: HttpClient) {}

  chat(message: string): Observable<AiChatResponse> {
    return this.http.post<AiChatResponse>(this.apiUrl, { message });
  }
}

