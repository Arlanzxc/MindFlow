import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AiWidgetComponent } from './components/ai-widget.component';
import { BreakActivity, BreakMenuComponent } from './components/break-menu.component';
import { FocusTimerComponent } from './components/focus-timer.component';
import { SchulteTableComponent } from './components/schulte-table.component';
import { UserPreferencesService } from '../../core/services/user-preferences.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FocusTimerComponent, SchulteTableComponent, BreakMenuComponent, AiWidgetComponent, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly preferences = inject(UserPreferencesService);

  readonly mode = signal<'focus' | 'break'>('focus');
  readonly breakActivity = signal<BreakActivity | null>(null);
  readonly isLoggingOut = signal(false);
  readonly hobby = this.preferences.hobby;

  onBreakRequested(): void {
    this.mode.set('break');
    this.breakActivity.set(null);
  }

  onReturnToFocus(): void {
    this.mode.set('focus');
    this.breakActivity.set(null);
  }

  onBreakActivitySelected(activity: BreakActivity): void {
    this.breakActivity.set(activity);
  }

  backToBreakMenu(): void {
    this.breakActivity.set(null);
  }

  logout(): void {
    if (this.isLoggingOut()) {
      return;
    }

    this.isLoggingOut.set(true);

    this.authService.logout().subscribe({
      next: () => {
        this.isLoggingOut.set(false);
        void this.router.navigateByUrl('/login');
      },
      error: () => {
        this.isLoggingOut.set(false);
        void this.router.navigateByUrl('/login');
      },
    });
  }
}

