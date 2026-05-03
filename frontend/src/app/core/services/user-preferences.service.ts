import { Injectable, Signal, signal } from '@angular/core';

const HOBBY_KEY = 'mindflow_hobby';

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesService {
  private readonly hobbySignal = signal<string>(localStorage.getItem(HOBBY_KEY) ?? '');

  readonly hobby: Signal<string> = this.hobbySignal.asReadonly();

  setHobby(value: string): void {
    const normalized = value.trim();
    this.hobbySignal.set(normalized);
    localStorage.setItem(HOBBY_KEY, normalized);
  }
}

