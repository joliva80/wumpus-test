import { TestBed } from '@angular/core/testing';
import {AppModel, AppState, appState, GameState} from './app.model';
import { LogManager } from '../../managers';

const mockLogManager = {
  info: jasmine.createSpy('info'),
};

describe('AppModel', () => {
  let model: AppModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppModel,
        { provide: LogManager, useValue: mockLogManager },
      ],
    });
    model = TestBed.inject(AppModel);
  });

  it('should be created', () => {
    expect(model).toBeTruthy();
  });

  describe('getModel', () => {
    it('should return the current state of the model', () => {
      const initialState = model.getModel();
      expect(initialState).toEqual(appState);
    });
  });

  describe('getProperty', () => {
    it('should return the value of the specified property', () => {
      const cellsValue = model.getProperty('cells');
      expect(cellsValue).toEqual(appState.cells);
    });
  });

  describe('updateProperty', () => {
    it('should update the specified property with the new value', () => {
      const newArrowsValue = 5;
      model.updateProperty('arrows', newArrowsValue);
      expect(model.getModel().arrows).toBe(newArrowsValue);
    });

    it('should not modify other properties when updating one property', () => {
      const initialPitsValue = model.getModel().pits;
      const newArrowsValue = 5;
      model.updateProperty('arrows', newArrowsValue);
      expect(model.getModel().pits).toEqual(initialPitsValue);
    });
  });

  describe('updateModel', () => {
    it('should update multiple properties using the provided update function', () => {
      const updateFn = (currentState: AppState) => ({
        arrows: 10,
        state: GameState.Game
      });
      model.updateModel(updateFn);
      const currentState = model.getModel();
      expect(currentState.arrows).toBe(10);
      expect(currentState.state).toBe(GameState.Game);
    });
  });
});
