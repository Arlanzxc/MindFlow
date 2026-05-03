import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-placeholder',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="mx-auto max-w-3xl p-6 sm:p-10">
      <div class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 class="text-2xl font-semibold text-slate-900">MindFlow Dashboard</h1>
        <p class="mt-2 text-slate-600">
          Auth is working. Focus timer and Schulte table UI will be added in Step 4.
        </p>
        <div class="mt-6 flex gap-3">
          <a
            routerLink="/login"
            class="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Back to Login
          </a>
          <button
            type="button"
            class="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            (click)="logout()"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DashboardPlaceholderComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  logout(): void {
    this.authService.logout().subscribe({
      next: () => void this.router.navigateByUrl('/login'),
      error: () => void this.router.navigateByUrl('/login'),
    });
  }
}

