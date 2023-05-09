import { createSelector } from '@ngrx/store';
import { PokemonState } from './pokemon.state';
import { AppState } from './app.state';

const selectPokemonState = (state: AppState) => state.PokemonState;

export const selectPokemonList = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.pokemonList
);

export const selectPersonal = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.personal
);

export const selectPersonalById = (id: any) =>
  createSelector(selectPersonal, (personal) => {
    console.log('o id ', id, personal)
    return personal[id] || {
      comments: {
        name: '',
        text: '',
      },
      isFavorite: false,
      description: '',
    }
  });

export const getPaginationState = createSelector(
  selectPokemonState,
  (state) => state.pagination
);
