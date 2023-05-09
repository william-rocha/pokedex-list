import { createAction, props } from '@ngrx/store';
import { Pokemon, PokemonDetails, PokemonList } from '../models/pokemon.model';

export const loadPokemon = createAction('[Pokemon List] Load Pokemon');

export const getPokemonList = createAction(
  '[Pokemon List] Get Pokemon List',
  props<{ currentPage: number }>()
);

export const loadPokemonSuccess = createAction(
  '[Pokemon List] Load Pokemon Success',
  props<{ pokemon: Pokemon[] }>()
);

export const loadPokemonListFail = createAction(
  '[Pokemon List] Load Pokemon List Fail',
  props<{ error: any }>()
);

export const setPokemonList = createAction(
  '[Pokemon List] Set Pokemon List',
  props<{ pokemonList: PokemonList }>()
);

export const toggleFavorite = createAction(
  '[Pokemon Favorites] Add Pokemon to Favorites',
  props<{ id: number }>()
);

export const addComment = createAction(
  '[Pokemon Comments] Add Comment',
  props<{ id: number; comment: {name: string, text: string} }>()
);

export const removeComment = createAction(
  '[Pokemon Comments] Remove Comment',
  props<{ id: number }>()
);

export const searchPokemonName = createAction(
  '[Pokemon Search] Search Pokemon Name',
  props<{ name: string }>()
);

export const loadPokemonDetails = createAction(
  '[Pokemon Details] Load Pokemon Details',
  props<{ id: number }>()
);

export const loadPokemonDetailsSuccess = createAction(
  '[Pokemon Details] Load Pokemon Details Success',
  props<{ pokemonDetails: PokemonDetails }>()
);

export const loadPokemonDetailsFail = createAction(
  '[Pokemon Details] Load Pokemon Details Failure',
  props<{ error: string }>()
);


