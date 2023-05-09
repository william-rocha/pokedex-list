import { createReducer, on } from '@ngrx/store';
import { PokemonDetails, PokemonList } from '../models/pokemon.model';

import * as ac from '../store/pokemon.actions';
export interface PokemonState {
  pokemonList: PokemonList;
  loading: boolean;
  searchByName: string;
  pagination: Pagination;
  personal: Personal;
  pokemonDetails: PokemonDetails | {}
}
export interface PersonalObj {
  comments?: { name: string; text: string };
  isFavorite?: boolean;
  description?: string;
}
export interface Personal {
  [id: string]: PersonalObj;
}
export interface Pagination {
  totalPage: number;
  offsetPage: number;
  pageSize: number;
  currentPage: number;
}

export const initialState: PokemonState = {
  pokemonList: {
    count: null,
    next: null,
    previous: null,
    results: [],
  },
  personal: {},
  loading: false,
  searchByName: '',
  pokemonDetails: {},
  pagination: {
    totalPage: 0,
    pageSize: 10,
    offsetPage: 0,
    currentPage: 0,
  },
};

export const pokemonReducer = createReducer(
  initialState,
  on(ac.setPokemonList, (state, { pokemonList }) => {
    let totalPages: number = 0;
    let resultFactory = [];
    if (pokemonList?.count !== null && pokemonList?.results?.length) {
      totalPages = Math.ceil(pokemonList.count / state.pagination.pageSize);
      resultFactory = pokemonList.results.map((res: any) => ({
        ...res,
        isFavorite: false,
      }));
    }
    return {
      ...state,
      pokemonList: { ...state.pokemonList, results: resultFactory },
      pagination: { ...state.pagination, totalPage: totalPages ?? 0 },
      loading: false,
    };
  }),
  on(ac.searchPokemonName, (state, { name }) => {
    return {
      ...state,
      searchByName: name,
      loading: true,
    };
  }),
  on(ac.getPokemonList, (state, { currentPage }) => {
    return {
      ...state,
      pagination: { ...state.pagination, currentPage: currentPage },
      loading: true,
    };
  }),
  on(ac.toggleFavorite, (state, { id }) => {
    const updatedPersonal = {
      ...state.personal,
      [id]: {
        ...state.personal[id],
        isFavorite: !state.personal[id]?.isFavorite,
      },
    };
    return {
      ...state,
      personal: updatedPersonal,
    };
  }),
  on(ac.addComment, (state, { id, comment }) => {
    const updatedPokemon = {
      ...state.personal[id],
      comments: {
        ...state.personal[id].comments,
        ...comment,
      },
    };
    const updatedPersonal = { ...state.personal, [id]: updatedPokemon };
    return { ...state, personal: updatedPersonal };
  }),
  on(ac.removeComment, (state, { id }) => {
    const updatedPersonal = { ...state.personal };
    delete updatedPersonal[id];
    return {
      ...state,
      pokemonList: { ...state.pokemonList },
      personal: updatedPersonal,
    };
  }),
  on(ac.loadPokemonSuccess, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(ac.loadPokemonListFail, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(ac.loadPokemonDetails, (state) => ({
    ...state,
    loading: true,
  })),
  on(ac.loadPokemonDetailsSuccess, (state, { pokemonDetails }) => ({
    ...state,
    pokemonDetails,
    loading: false,
  })),
  on(ac.loadPokemonDetailsFail, (state) => ({
    ...state,
    loading: false,
  }))
);
