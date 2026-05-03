import { Component, EventEmitter, Output, inject } from '@angular/core';
import { UserPreferencesService } from '../../../core/services/user-preferences.service';

export type BreakActivity = 'schulte' | 'eyes' | 'warmup' | 'hobby';

@Component({
  selector: 'app-break-menu',
  standalone: true,
  templateUrl: './break-menu.component.html',
})
export class BreakMenuComponent {
  @Output() activitySelected = new EventEmitter<BreakActivity>();

  private readonly preferences = inject(UserPreferencesService);
  readonly hobby = this.preferences.hobby;

  select(activity: BreakActivity): void {
    this.activitySelected.emit(activity);
  }
}

