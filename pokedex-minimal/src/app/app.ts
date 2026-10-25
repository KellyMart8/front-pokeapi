import { Component, signal } from '@angular/core';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list';


@Component({
  selector: 'app-root',
  imports: [PokemonListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pokedex-minimal');
}
