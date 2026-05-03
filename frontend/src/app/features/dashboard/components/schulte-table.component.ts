import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output, computed, signal } from '@angular/core';
import { GameResultService } from '../../../core/services/game-result.service';

@Component({
  selector: 'app-schulte-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schulte-table.component.html',
})
export class SchulteTableComponent implements OnInit, OnDestroy {
  @Output() returnToFocus = new EventEmitter<void>();

  readonly grid = signal<number[]>([]);
  readonly expectedNumber = signal(1);
  readonly completed = signal<Set<number>>(new Set<number>());
  readonly wrongFlash = signal<number | null>(null);
  readonly gameStarted = signal(false);
  readonly elapsedMs = signal(0);
  readonly isSubmitting = signal(false);
  readonly completeMessage = signal<string | null>(null);

  private stopwatchRef: ReturnType<typeof setInterval> | null = null;
  private startedAt = 0;

  readonly elapsedLabel = computed(() => (this.elapsedMs() / 1000).toFixed(2));

  ngOnInit(): void {
    this.prepareGame(false);
  }

  ngOnDestroy(): void {
    this.clearStopwatch();
  }

  constructor(private readonly gameResultService: GameResultService) {}

  startGame(): void {
    this.prepareGame(true);
  }

  onCardClick(number: number): void {
    if (!this.gameStarted() || this.completeMessage()) {
      return;
    }

    if (number !== this.expectedNumber()) {
      this.wrongFlash.set(number);
      setTimeout(() => this.wrongFlash.set(null), 280);
      return;
    }

    this.completed.update((set) => new Set([...set, number]));

    if (number === 25) {
      this.finishGame();
      return;
    }

    this.expectedNumber.update((value) => value + 1);
  }

  playAgain(): void {
    this.prepareGame(true);
  }

  private finishGame(): void {
    this.clearStopwatch();
    this.isSubmitting.set(true);
    const timeSeconds = this.elapsedMs() / 1000;

    this.gameResultService.store(timeSeconds).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.completeMessage.set(`Training Complete! Score saved (${timeSeconds.toFixed(2)}s).`);
      },
      error: () => {
        this.isSubmitting.set(false);
        this.completeMessage.set(`Training Complete! Could not sync score (${timeSeconds.toFixed(2)}s).`);
      },
    });
  }

  private prepareGame(startNow: boolean): void {
    this.clearStopwatch();
    this.grid.set(this.shuffle(Array.from({ length: 25 }, (_, index) => index + 1)));
    this.expectedNumber.set(1);
    this.completed.set(new Set<number>());
    this.wrongFlash.set(null);
    this.elapsedMs.set(0);
    this.completeMessage.set(null);
    this.gameStarted.set(startNow);

    if (startNow) {
      this.startedAt = Date.now();
      this.stopwatchRef = setInterval(() => {
        this.elapsedMs.set(Date.now() - this.startedAt);
      }, 50);
    }
  }

  private clearStopwatch(): void {
    if (this.stopwatchRef) {
      clearInterval(this.stopwatchRef);
      this.stopwatchRef = null;
    }
  }

  private shuffle(numbers: number[]): number[] {
    const copy = [...numbers];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}

