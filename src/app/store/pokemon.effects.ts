import { setPokemonList } from './pokemon.actions';
import { Injectable } from '@angular/core';

import { PokemonService } from 'src/app/service/pokemon.service';

import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as PokemonActions from '../store/pokemon.actions';
import { PokemonDetails } from '../models/pokemon.model';
@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ) {}

  getPokemonList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.getPokemonList),
      switchMap(({ currentPage }) =>
        this.pokemonService.getPokemons(currentPage).pipe(
          map((pokemonList) => {
            return PokemonActions.setPokemonList({ pokemonList });
          }),
          catchError((error) =>
            of(PokemonActions.loadPokemonListFail({ error }))
          )
        )
      )
    )
  );

  searchPokemonName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.searchPokemonName),
      switchMap(({ name }) =>
        this.pokemonService.searchPokemon(name).pipe(
          map((pokemon: any) =>
            {
              const pokemonObj = {
                count: 1,
                next: null,
                previous:null,
                results: [{
                  id: pokemon.id,
                  name: pokemon.name,
                  url: ''
                }]
              }
              return PokemonActions.setPokemonList({ pokemonList: pokemonObj })}
          ),
          catchError((error) =>
            of(PokemonActions.loadPokemonListFail({ error }))
          )
        )
      )
    )
  );

  loadPokemonDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemonDetails),
      switchMap(({ id }) =>
        this.pokemonService.getPokemonDetails(id).pipe(
          map((pokemonDetails) =>
            PokemonActions.loadPokemonDetailsSuccess({ pokemonDetails })
          ),
          catchError((error) =>
            of(PokemonActions.loadPokemonDetailsFail({ error }))
          )
        )
      )
    )
  );
}
