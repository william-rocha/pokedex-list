import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonDetails, PokemonList } from '../models/pokemon.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(currentPage = 0, pageSize = 10): Observable<any> {
    const offset = (currentPage - 1) * pageSize;

    const url = `${this.baseUrl}?offset=${offset}&limit=${pageSize}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        return {
          count: response.count,
          results: response.results.map((result: any) => {
            const id = result.url.split('/').filter(Boolean).pop();
            return { id, ...result };
          }),
        };
      })
    );
  }

  getPokemon(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<any>(url);
  }

  searchPokemon(name: string): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${this.baseUrl}/${name}`).pipe(
      map((res: any) => {
        return { count: 1, next: null, previous: null, results: res.form };
      })
    );
  }

  getPokemonDetails(id: number): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.baseUrl}/${id}`).pipe(
      map((res: any) => {
        return {
          id: res.id,
          name: res.name,
          type: res.types,
          height: res.height,
          weight: res.weight,
          pic: res.sprites.front_default,
        };
      })
    );
  }


}
