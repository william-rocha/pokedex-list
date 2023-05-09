import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as PokemonActions from '../../store/pokemon.actions';

@Component({
  selector: 'favorite-button',
  styleUrls: ['./favorite.component.scss'],
  template: `
    <div
      class="favorite"
      (click)="toggleFavoriteStar(); $event.stopPropagation()"
    >
      <input type="radio" name="favorite" id="star" />
      <ng-container *ngIf="isFavorite$; else notFavorite">
        <label for="star">★</label>
      </ng-container>
      <ng-template #notFavorite>
        <label for="star">☆</label>
      </ng-template>
    </div>
  `,
})
export class FavoriteButtonComponent {
  @Input() isFavorite$: boolean | undefined;
  @Output() toggleFavorite = new EventEmitter<void>();

  constructor() {}

  toggleFavoriteStar() {
    this.toggleFavorite.emit();
  }
}
