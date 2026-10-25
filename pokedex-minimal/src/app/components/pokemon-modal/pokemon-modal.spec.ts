import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonModal } from './pokemon-modal';

describe('PokemonModal', () => {
  let component: PokemonModal;
  let fixture: ComponentFixture<PokemonModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonModal],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
