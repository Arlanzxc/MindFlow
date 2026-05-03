import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, Output, computed, signal } from '@angular/core';
import { FocusService } from '../../../core/services/focus.service';

@Component({
  selector: 'app-focus-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './focus-timer.component.html',
})
export class FocusTimerComponent implements OnDestroy {
  @Output() breakRequested = new EventEmitter<void>();

  readonly totalSeconds = signal(45 * 60);
  readonly isRunning = signal(false);
  readonly isEmergencyMode = signal(false);
  readonly snoozeCount = signal(0);
  readonly isSyncing = signal(false);
  readonly sessionId = signal<number | null>(null);
  readonly errorMessage = signal<string | null>(null);

  private countdownRef: ReturnType<typeof setInterval> | null = null;

  readonly timerLabel = computed(() => {
    const minutes = Math.floor(this.totalSeconds() / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (this.totalSeconds() % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  });

  readonly canSnooze = computed(() => this.snoozeCount() < 3 && this.sessionId() !== null);
  readonly showBreakActions = computed(() => this.totalSeconds() === 0 && !this.isRunning());

  constructor(private readonly focusService: FocusService) {}

  ngOnDestroy(): void {
    this.clearCountdown();
  }

  start(): void {
    if (this.isRunning() || this.isSyncing()) {
      return;
    }

    if (this.sessionId() === null) {
      this.isSyncing.set(true);
      this.errorMessage.set(null);

      this.focusService.start(Math.ceil(this.totalSeconds() / 60)).subscribe({
        next: (session) => {
          this.sessionId.set(session.id);
          this.snoozeCount.set(session.snooze_count);
          this.isSyncing.set(false);
          this.isRunning.set(true);
          this.beginCountdown();
        },
        error: () => {
          this.isSyncing.set(false);
          this.errorMessage.set('Unable to start focus session. Please retry.');
        },
      });
      return;
    }

    this.isRunning.set(true);
    this.beginCountdown();
  }

  pause(): void {
    this.isRunning.set(false);
    this.clearCountdown();
  }

  toggleEmergencyMode(): void {
    this.isEmergencyMode.update((value) => !value);
  }

  snooze(): void {
    if (!this.canSnooze() || this.isSyncing()) {
      return;
    }

    const id = this.sessionId();
    if (id === null) {
      return;
    }

    this.isSyncing.set(true);
    this.errorMessage.set(null);

    this.focusService.snooze(id).subscribe({
      next: (session) => {
        this.snoozeCount.set(session.snooze_count);
        this.totalSeconds.update((seconds) => seconds + 5 * 60);
        this.isSyncing.set(false);
      },
      error: () => {
        this.isSyncing.set(false);
        this.errorMessage.set('Snooze request failed. Please try again.');
      },
    });
  }

  takeBreak(): void {
    if (this.isEmergencyMode() || this.isSyncing()) {
      return;
    }

    const id = this.sessionId();
    if (id === null) {
      this.breakRequested.emit();
      return;
    }

    this.isSyncing.set(true);
    this.errorMessage.set(null);

    this.focusService.complete(id).subscribe({
      next: () => {
        this.isSyncing.set(false);
        this.resetLocalSession();
        this.breakRequested.emit();
      },
      error: () => {
        this.isSyncing.set(false);
        this.errorMessage.set('Could not complete session. Please retry.');
      },
    });
  }

  private beginCountdown(): void {
    this.clearCountdown();
    this.countdownRef = setInterval(() => {
      if (!this.isRunning()) {
        return;
      }

      if (this.totalSeconds() > 0) {
        this.totalSeconds.update((seconds) => seconds - 1);
      }

      if (this.totalSeconds() === 0) {
        this.isRunning.set(false);
        this.clearCountdown();
      }
    }, 1000);
  }

  private clearCountdown(): void {
    if (this.countdownRef) {
      clearInterval(this.countdownRef);
      this.countdownRef = null;
    }
  }

  private resetLocalSession(): void {
    this.clearCountdown();
    this.totalSeconds.set(45 * 60);
    this.isRunning.set(false);
    this.snoozeCount.set(0);
    this.sessionId.set(null);
    this.isEmergencyMode.set(false);
  }
}

