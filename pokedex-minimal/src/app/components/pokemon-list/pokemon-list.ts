import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card';
import { PokemonModalComponent } from '../pokemon-modal/pokemon-modal';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PokemonCardComponent, PokemonModalComponent],
  template: `
    <div class="max-w-6xl mx-auto p-6">
      <header class="mb-10 text-center">
        <h1 class="text-4xl font-bold text-slate-800 mb-6 tracking-tight">Pokédex Minimalista</h1>

        <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (input)="filterPokemons()"
            placeholder="Buscar por nombre..."
            class="flex-1 px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white transition-shadow">

          <select
            [(ngModel)]="selectedType"
            (change)="filterPokemons()"
            class="px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white capitalize">
            <option value="">Todos los tipos</option>
            @for (type of availableTypes; track type) {
              <option [value]="type">{{ type }}</option>
            }
          </select>
        </div>
      </header>

      @if (loading) {
        <div class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
        </div>
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          @for (pokemon of filteredPokemons; track pokemon.id) {
            <app-pokemon-card
              [pokemon]="pokemon"
              (onClick)="selectedPokemon = $event">
            </app-pokemon-card>
          }
        </div>

        @if (filteredPokemons.length === 0) {
          <div class="text-center text-slate-500 py-12">
            No se encontraron personajes que coincidan con tu búsqueda.
          </div>
        }
      }

      @if (selectedPokemon) {
        <app-pokemon-modal
          [pokemon]="selectedPokemon"
          (close)="selectedPokemon = null">
        </app-pokemon-modal>
      }
    </div>
  `
})
export class PokemonListComponent implements OnInit {
  private pokemonService = inject(PokemonService);

  allPokemons: any[] = [];
  filteredPokemons: any[] = [];
  availableTypes: string[] = [];

  searchTerm = '';
  selectedType = '';
  loading = true;
  selectedPokemon: any = null;

  ngOnInit() {
    this.pokemonService.getPokemons(150).subscribe(data => {
      this.allPokemons = data;
      this.filteredPokemons = data;
      this.extractTypes(data);
      this.loading = false;
    });
  }

  extractTypes(pokemons: any[]) {
    const types = new Set<string>();
    pokemons.forEach(p => p.types.forEach((t: any) => types.add(t.type.name)));
    this.availableTypes = Array.from(types).sort();
  }

  filterPokemons() {
    this.filteredPokemons = this.allPokemons.filter(p => {
      const matchName = p.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchType = this.selectedType === '' ||
                        p.types.some((t: any) => t.type.name === this.selectedType);
      return matchName && matchType;
    });
  }
}
