import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserPreferencesService } from '../../core/services/user-preferences.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private readonly authService = inject(AuthService);
  private readonly preferences = inject(UserPreferencesService);

  readonly hobbyInput = signal('');
  readonly currentUser = this.authService.currentUser;
  readonly hobby = this.preferences.hobby;

  readonly statCards = computed(() => [
    { label: 'Total Focus Time', value: '18h 40m', accent: 'text-cyan-200' },
    { label: 'Snoozes Used', value: '12', accent: 'text-amber-200' },
    { label: 'Best Schulte Time', value: '36.42s', accent: 'text-emerald-200' },
  ]);

  constructor() {
    this.hobbyInput.set(this.hobby());
  }

  saveHobby(): void {
    this.preferences.setHobby(this.hobbyInput());
  }
}

