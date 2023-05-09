import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PokemonList } from 'src/app/models/pokemon.model';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectPokemonList } from 'src/app/store/selectors';
import * as PokemonActions from '../../store/pokemon.actions';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  searchForm!: FormGroup;
  pokemonList$!: Observable<PokemonList>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.getPokemons();
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });
    this.pokemonList$ = this.store.pipe(select(selectPokemonList));
  }

  getPokemons(): void {
    this.store.dispatch(PokemonActions.getPokemonList({ currentPage: 1 }));
  }

  submitSearch() {
    const searchTerm = this.searchForm.get('searchTerm')?.value;
    this.store.dispatch(PokemonActions.searchPokemonName({ name: searchTerm }));
  }
}
