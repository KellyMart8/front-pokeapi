import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div class="bg-surface w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative animate-fade-in-up">
        <button (click)="close.emit()" class="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 text-gray-500 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div class="bg-slate-50 p-8 flex justify-center">
          <img [src]="pokemon.sprites.other['official-artwork'].front_default" class="w-48 h-48 drop-shadow-lg">
        </div>

        <div class="p-8">
          <h2 class="text-3xl font-bold capitalize mb-4 text-center text-gray-800">{{ pokemon.name }}</h2>

          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-slate-50 p-4 rounded-xl text-center">
              <p class="text-sm text-gray-500 mb-1">Altura</p>
              <p class="font-semibold">{{ pokemon.height / 10 }} m</p>
            </div>
            <div class="bg-slate-50 p-4 rounded-xl text-center">
              <p class="text-sm text-gray-500 mb-1">Peso</p>
              <p class="font-semibold">{{ pokemon.weight / 10 }} kg</p>
            </div>
          </div>

          <div class="mb-4">
            <h4 class="font-semibold text-gray-700 mb-2">Habilidades</h4>
            <div class="flex flex-wrap gap-2">
              @for (ability of pokemon.abilities; track ability.ability.name) {
                <span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm capitalize">
                  {{ ability.ability.name }}
                </span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in-up { animation: fadeInUp 0.3s ease-out; }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class PokemonModalComponent {
  @Input() pokemon: any;
  @Output() close = new EventEmitter<void>();
}
