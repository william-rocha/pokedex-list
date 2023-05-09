import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pokemon, PokemonDetails } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/service/pokemon.service';

import { Observable, map, switchMap } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent {
  @Output() onClose = new EventEmitter();
  @Input() select!: Pokemon;

  imageUrl = '';

  pokemon$!: Observable<PokemonDetails>;
  constructor(
    private route: ActivatedRoute,
    private pokemonsService: PokemonService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const { id } = this.select;

    if (id) {
      this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      this.pokemonsService.getPokemonDetails(id);
    }
  }
}
