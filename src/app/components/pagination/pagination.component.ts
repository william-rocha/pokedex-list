import { Component } from '@angular/core';
import { AppState } from 'src/app/store/app.state';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Pagination } from 'src/app/store/pokemon.state';
import { getPaginationState } from 'src/app/store/selectors';
import * as PokemonActions from '../../store/pokemon.actions';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  pagination$!: Observable<Pagination>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.pagination$ = this.store.pipe(select(getPaginationState));
  }

  onPageChange(event: any) {
    this.store.dispatch(PokemonActions.getPokemonList({ currentPage: event }));
  }
}
