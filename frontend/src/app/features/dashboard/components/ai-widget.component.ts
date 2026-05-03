import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, signal, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../../core/services/ai.service';

interface ChatMessage {
  text: string;
  isAi: boolean;
}

@Component({
  selector: 'app-ai-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-widget.component.html',
})
export class AiWidgetComponent implements OnInit, OnDestroy {
  isOpen = signal(false);
  messages = signal<ChatMessage[]>([
    { text: "Hi! I'm your MindFlow AI. How can I support your focus today?", isAi: true }
  ]);
  newMessage = signal('');
  isTyping = signal(false);

  @ViewChild('chatScroll') private chatScroll!: ElementRef;
  
  // Переменная для хранения нашего таймера
  private postureCheckInterval: any;

  constructor(private aiService: AiService) {}

  ngOnInit() {
    this.postureCheckInterval = setInterval(() => {
      this.sendPostureCheck();
    }, 15 * 60 * 1000); 

  }

  ngOnDestroy() {
    if (this.postureCheckInterval) {
      clearInterval(this.postureCheckInterval);
    }
  }

  private sendPostureCheck() {
    const postureMessage = "🤖 Напоминание: Ты сейчас ровно сидишь? Сделай глубокий вдох, расправь плечи и выпрями спину!";
    
    this.messages.update(m => [...m, { text: postureMessage, isAi: true }]);
    
    if (!this.isOpen()) {
      this.isOpen.set(true);
    }
    
    setTimeout(() => this.scrollToBottom(), 100);
  }

  toggleChat() {
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  sendMessage() {
    const text = this.newMessage().trim();
    if (!text || this.isTyping()) return;

    this.messages.update(m => [...m, { text, isAi: false }]);
    this.newMessage.set('');
    this.isTyping.set(true);
    this.scrollToBottom();

    
    this.aiService.chat(text).subscribe({
      next: (res) => {
        this.messages.update(m => [...m, { text: res.reply, isAi: true }]);
        this.isTyping.set(false);
        this.scrollToBottom();
      },
      error: () => {
        this.messages.update(m => [...m, { text: 'Ошибка подключения к ИИ.', isAi: true }]);
        this.isTyping.set(false);
        this.scrollToBottom();
      }
    });
  }

  private scrollToBottom() {
    if (this.chatScroll) {
      const el = this.chatScroll.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
}