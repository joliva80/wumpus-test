import { LogManager } from '../../managers';
import {effect, Injectable, signal} from '@angular/core';

export enum GameState {
  Home,
  Game,
  GameOver,
  Win
}

export enum Actions {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}

export enum CellPicture {
  Empty = 'Empty',
  Player = 'Player',
  Wumpu = 'Wumpu',
  Pit = 'Pit',
  Gold = 'Gold',
  Stench = 'Stench',
  Breeze = 'Breeze'
}

export enum CellState {
  Visible,
  Invisible
}

export interface Cell {
  id: string;
  state: CellState;
  elements: CellPicture[];
}

export interface AppState {
  cells: number;
  pits: number;
  arrows: number;
  state: GameState
  board: Cell[][];
  playerPosition: [number, number];
  wumpuPosition: [number, number];
  goldPosition: [number, number];
  pitsPositions: [number, number][];
  direction: Actions;
  messages: string[];
}

export const appState: AppState = {
  cells: 10,
  pits: 2,
  arrows: 2,
  state: GameState.Home,
  board: [],
  playerPosition: [0, 0],
  wumpuPosition: [null, null],
  goldPosition: [null, null],
  pitsPositions: [],
  direction: Actions.Up,
  messages: []
}

@Injectable({ providedIn: 'root' })
export class AppModel {
  private _model = signal<AppState>(appState);

  constructor() {
    LogManager.info(this.constructor.name, 'Init');
  }

  getModel(): AppState {
    return this._model();
  }

  getProperty<K extends keyof AppState>(property: K) {
    return this._model()[property];
  }

  updateProperty<K extends keyof AppState>(property: string, value: AppState[K]) {
    this._model.update(currentState => ({ ...currentState, [property]: value }));
  }

  updateModel(updateFn: (currentState: AppState) => Partial<AppState>) {
    this._model.update(currentState => ({ ...currentState, ...updateFn(currentState) }));
  }
}
