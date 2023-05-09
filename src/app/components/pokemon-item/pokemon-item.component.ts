import { Component, Input } from '@angular/core';

import { Pokemon } from 'src/app/models/pokemon.model';
import { AppState } from 'src/app/store/app.state';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PersonalObj } from 'src/app/store/pokemon.state';
import { selectPersonalById } from 'src/app/store/selectors';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as PokemonActions from '../../store/pokemon.actions';

@Component({
  selector: 'pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent {
  @Input() pokemon!: Pokemon;

  selectPokemon!: Pokemon

  imageUrl!: string;
  personal: PersonalObj = {
    comments: {
      name: '',
      text: '',
    },
    isFavorite: false,
    description: '',
  };
  personal$!: Observable<PersonalObj>;
  isFavorite!: boolean;
  closeResult = '';

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon.id}.png`;

    const { id } = this.pokemon;
    this.personal$ = this.store.select(selectPersonalById(id));

    this.personal$.subscribe((personalNew) => {
      this.personal = personalNew;
    });
  }

  toggleFavorite(): void {
    this.store.dispatch(PokemonActions.toggleFavorite({ id: this.pokemon.id }));
  }

  goToDetail(content: any, select: Pokemon ): void {
    this.selectPokemon = select;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  removeComment(): void {
    this.store.dispatch(PokemonActions.removeComment({ id: this.pokemon.id }));
  }

  goToComment(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
