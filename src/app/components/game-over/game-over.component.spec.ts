import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOverComponent } from './game-over.component';
import {AppModel, GameState} from '../../core';

describe('GameOverComponent', () => {
  let component: GameOverComponent;
  let model: AppModel;
  let fixture: ComponentFixture<GameOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOverComponent],
      providers: [
        {
          provide: AppModel,
          useValue: {
            updateProperty: jasmine.createSpy('updateProperty'),
            getProperty: jasmine.createSpy('getProperty'),
          },
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameOverComponent);
    component = fixture.componentInstance;
    model = TestBed.inject(AppModel) as jasmine.SpyObj<AppModel>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('resetGameState', () => {
    it('should update arrows property in the model to 2', () => {
      component.resetGameState();
      expect(model.updateProperty).toHaveBeenCalledWith('arrows', 2);
    });

    it('should update state property in the model to GameState.Home', () => {
      component.resetGameState();
      expect(model.updateProperty).toHaveBeenCalledWith('state', GameState.Home);
    });
  });
});
