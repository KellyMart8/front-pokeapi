import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      (click)="onClick.emit(pokemon)"
      class="bg-surface rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center border border-gray-100">
      <img [src]="pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default"
           [alt]="pokemon.name"
           class="w-32 h-32 object-contain mb-4 transition-transform hover:scale-110">
      <h3 class="text-lg font-semibold capitalize text-gray-800">{{ pokemon.name }}</h3>
      <div class="flex gap-2 mt-3">
        @for (type of pokemon.types; track type.type.name) {
          <span class="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-600 capitalize">
            {{ type.type.name }}
          </span>
        }
      </div>
    </div>
  `
})
export class PokemonCardComponent {
  @Input() pokemon: any;
  @Output() onClick = new EventEmitter<any>();
}
