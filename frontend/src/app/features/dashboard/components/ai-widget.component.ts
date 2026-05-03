import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../../core/services/ai.service';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

@Component({
  selector: 'app-ai-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-widget.component.html',
})
export class AiWidgetComponent {
  @ViewChild('messageContainer') private messageContainer?: ElementRef<HTMLDivElement>;

  readonly isOpen = signal(false);
  readonly inputValue = signal('');
  readonly isLoading = signal(false);
  readonly messages = signal<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Neutral Robot online. Describe your current focus state for guidance.',
    },
  ]);

  constructor(private readonly aiService: AiService) {}

  toggle(): void {
    this.isOpen.update((value) => !value);
    setTimeout(() => this.scrollToBottom(), 40);
  }

  send(): void {
    const message = this.inputValue().trim();
    if (!message || this.isLoading()) {
      return;
    }

    this.messages.update((current) => [...current, { role: 'user', text: message }]);
    this.inputValue.set('');
    this.isLoading.set(true);
    this.scrollToBottom();

    this.aiService.chat(message).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.messages.update((current) => [...current, { role: 'assistant', text: response.reply }]);
        this.scrollToBottom();
      },
      error: () => {
        this.isLoading.set(false);
        this.messages.update((current) => [
          ...current,
          { role: 'assistant', text: 'Connection unstable. Use a short break and try again.' },
        ]);
        this.scrollToBottom();
      },
    });
  }

  private scrollToBottom(): void {
    requestAnimationFrame(() => {
      const native = this.messageContainer?.nativeElement;
      if (!native) {
        return;
      }
      native.scrollTop = native.scrollHeight;
    });
  }
}

