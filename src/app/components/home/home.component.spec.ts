import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {AppModel, GameState} from '../../core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let model: AppModel;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
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

    fixture = TestBed.createComponent(HomeComponent);
    model = TestBed.inject(AppModel) as jasmine.SpyObj<AppModel>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateProperty on the model with the property and target value', () => {
    const propertyName = 'cells';
    const mockTarget = { value: 10 };
    component.updateValue(propertyName, mockTarget);
    expect(model.updateProperty).toHaveBeenCalledWith(propertyName, 10);
  });

  it('should call updateProperty on the model with state set to GameState.Game', () => {
    component.changeGameState();
    expect(model.updateProperty).toHaveBeenCalledWith('state', GameState.Game);
  });
});
