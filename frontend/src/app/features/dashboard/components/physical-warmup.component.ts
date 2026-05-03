import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-physical-warmup',
  standalone: true,
  template: `
    <div class="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900/90 to-emerald-900/20 p-8 shadow-[0_10px_40px_rgba(16,185,129,0.15)] backdrop-blur-xl max-w-2xl mx-auto">
      <div class="flex items-center gap-4 mb-6">
        <div class="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-white">Body Activation</h2>
          <p class="text-sm text-emerald-200/70">Reset your posture and blood flow</p>
        </div>
      </div>

      <div class="space-y-4 mb-8">
        <div class="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold">1</div>
          <div>
            <h3 class="font-semibold text-emerald-300">Stand & Stretch</h3>
            <p class="text-sm text-slate-300 mt-1">Stand up. Reach both hands high toward the ceiling. Take a deep breath in, hold for 3 seconds, and exhale slowly.</p>
          </div>
        </div>
        <div class="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold">2</div>
          <div>
            <h3 class="font-semibold text-emerald-300">Neck & Shoulder Rolls</h3>
            <p class="text-sm text-slate-300 mt-1">Roll your shoulders back 5 times, then forward 5 times. Gently tilt your head side to side to stretch the neck.</p>
          </div>
        </div>
        <div class="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-4">
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold">3</div>
          <div>
            <h3 class="font-semibold text-emerald-300">Coder's Wrist Relief</h3>
            <p class="text-sm text-slate-300 mt-1">Extend one arm out, palm facing up. Use the other hand to gently pull your fingers down. Hold for 10s, then switch.</p>
          </div>
        </div>
      </div>

      <button (click)="back.emit()" class="w-full rounded-xl bg-slate-800 py-3 font-semibold text-slate-200 transition hover:bg-slate-700 border border-slate-700">
        I feel refreshed! Return
      </button>
    </div>
  `
})
export class PhysicalWarmupComponent {
  @Output() back = new EventEmitter<void>();
}