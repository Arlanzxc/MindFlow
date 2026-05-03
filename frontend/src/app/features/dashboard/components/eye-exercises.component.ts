import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-eye-exercises',
  standalone: true,
  template: `
    <div class="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/90 to-cyan-900/20 p-8 shadow-[0_10px_40px_rgba(6,182,212,0.15)] backdrop-blur-xl max-w-2xl mx-auto">
      <div class="flex items-center gap-4 mb-6">
        <div class="grid h-12 w-12 place-items-center rounded-xl bg-cyan-500/20 text-cyan-300">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-white">Eye Rescue Protocol</h2>
          <p class="text-sm text-cyan-200/70">Prevent digital eye strain</p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 mb-8">
        <div class="rounded-2xl border border-white/5 bg-white/5 p-5 transition hover:bg-white/10">
          <h3 class="font-semibold text-cyan-300 mb-2">1. The 20-20-20 Rule</h3>
          <p class="text-sm text-slate-300">Look at something 20 feet away for 20 seconds. Let your focus relax.</p>
        </div>
        <div class="rounded-2xl border border-white/5 bg-white/5 p-5 transition hover:bg-white/10">
          <h3 class="font-semibold text-cyan-300 mb-2">2. Palming</h3>
          <p class="text-sm text-slate-300">Rub hands together to warm them, gently cup them over closed eyes for 30s.</p>
        </div>
        <div class="rounded-2xl border border-white/5 bg-white/5 p-5 transition hover:bg-white/10">
          <h3 class="font-semibold text-cyan-300 mb-2">3. Figure 8</h3>
          <p class="text-sm text-slate-300">Imagine a large "8" 10 feet away. Trace it with your eyes slowly for 30s.</p>
        </div>
        <div class="rounded-2xl border border-white/5 bg-white/5 p-5 transition hover:bg-white/10">
          <h3 class="font-semibold text-cyan-300 mb-2">4. Conscious Blinking</h3>
          <p class="text-sm text-slate-300">Close eyes tightly for 2 seconds, then open and blink rapidly 10 times.</p>
        </div>
      </div>

      <button (click)="back.emit()" class="w-full rounded-xl bg-slate-800 py-3 font-semibold text-slate-200 transition hover:bg-slate-700 border border-slate-700">
        Finish Protocol & Return
      </button>
    </div>
  `
})
export class EyeExercisesComponent {
  @Output() back = new EventEmitter<void>();
}