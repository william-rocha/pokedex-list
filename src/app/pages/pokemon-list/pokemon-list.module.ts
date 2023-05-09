import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { PokemonListRoutingModule } from './pokemon-list-routing.module';

import { PokemonListComponent } from './pokemon-list.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { PokemonItemComponent } from 'src/app/components/pokemon-item/pokemon-item.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { pokemonReducer } from 'src/app/store/pokemon.state';
import { PokemonCommentComponent } from 'src/app/components/modal-container/pokemon-comment/pokemon-comment.component';
import { PokemonDetailComponent } from 'src/app/components/modal-container/pokemon-detail/pokemon-detail.component';
import { FavoriteButtonComponent } from 'src/app/components/favorite/favorite.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonItemComponent,
    PaginationComponent,
    PokemonCommentComponent,
    PokemonDetailComponent,
    FavoriteButtonComponent,
  ],
  imports: [
    CommonModule,
    PokemonListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forFeature('PokemonState', pokemonReducer),
  ],
})
export class PokemonListModule {}
