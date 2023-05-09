import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCommentComponent } from './pokemon-comment.component';

describe('PokemonCommentComponent', () => {
  let component: PokemonCommentComponent;
  let fixture: ComponentFixture<PokemonCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
