import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.state';
import * as PokemonActions from 'src/app/store/pokemon.actions';

@Component({
  selector: 'pokemon-comment',
  templateUrl: './pokemon-comment.component.html',
  styleUrls: ['./pokemon-comment.component.scss']
})
export class PokemonCommentComponent {
  @Output() onClose = new EventEmitter;
  @Input() id!: number

  form!: FormGroup;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private fb : FormBuilder) {
    this.form = this.fb.group({
      comment:  ['', Validators.required],
      name:  ['', Validators.required],
    });
  }

  addComment(form: FormGroup): void {
    const { comment, name } = form.value;
    this.store.dispatch(
      PokemonActions.addComment({ id: this.id, comment: { text: comment, name } })
    );
  }
}
