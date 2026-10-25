import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2';

  // Obtenemos un lote de Pokémon y luego sus detalles para poder filtrar
  getPokemons(limit = 50): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/pokemon?limit=${limit}`).pipe(
      switchMap(response => {
        const requests: Observable<any>[] = response.results.map(
          (p: any) => this.http.get<any>(p.url)
            );
        return forkJoin(requests);
      })
    );
  }
}
