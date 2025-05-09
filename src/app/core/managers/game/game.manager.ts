import {computed, effect, Injectable} from '@angular/core';
import {Actions, AppModel, Cell, GameState} from '../../models';
import {KeyActions} from '../keyboard/keyboard.manager';
import {arrowImpactInWumpu, createBoard, movements, samePosition, updateBoard, validMovement} from './game.utils';

@Injectable()
export class GameManager {
  readonly translationMap: KeyActions = {
    [Actions.Up]: () => 'arriba',
    [Actions.Down]: () => 'abajo',
    [Actions.Left]: () => 'izquierda',
    [Actions.Right]: () => 'derecha'
  }

  samePositionPlayerAndGold = computed(() =>
    samePosition(this.model.getProperty('playerPosition'), this.model.getProperty('goldPosition'))
  );
  samePositionPlayerAndWumpu = computed(() =>
    samePosition(this.model.getProperty('playerPosition'), this.model.getProperty('wumpuPosition'))
  );
  samePositionPlayerAndPits = computed(() =>
    this.model.getProperty('pitsPositions')
      .map(element => samePosition(this.model.getProperty('playerPosition'), element))
      .filter(value => value === true)
  );

  constructor(private model: AppModel) {
    const {
      board,
      playerPosition,
      wumpuPosition,
      goldPosition,
      pitsPositions } = createBoard(this.model.getProperty('cells'), this.model.getProperty('pits'));

    this.model.updateProperty('messages', []);
    this.model.updateProperty('board', board);
    this.model.updateProperty('playerPosition', playerPosition);
    this.model.updateProperty('wumpuPosition', wumpuPosition);
    this.model.updateProperty('goldPosition', goldPosition);
    this.model.updateProperty('pitsPositions', pitsPositions);

    effect(() => {
      if(this.samePositionPlayerAndGold()) {
        this.model.updateProperty('state', GameState.Win);
      }
      if(this.samePositionPlayerAndWumpu()) {
        this.model.updateProperty('state', GameState.GameOver);
      }
      if(this.samePositionPlayerAndPits().length) {
        this.model.updateProperty('pitsPositions', []);
        this.model.updateProperty('state', GameState.GameOver);
      }
    })
  }

  movePlayer(direction: Actions) {
    const { playerPosition, board } = this.model.getModel();

    if(movements[direction]) {
      const newPosition =movements[direction](playerPosition);
      if (validMovement(newPosition[0], newPosition[1], board.length)) {
        const newValues = this.calculateMovement(board, playerPosition, newPosition);
        this.model.updateProperty('board', newValues.board);
        this.model.updateProperty('playerPosition', newValues.playerPosition);
        this.model.updateProperty('direction', direction);
        this.model.updateProperty('messages', [
          ...this.model.getProperty('messages'),
          `Movimiento dirección: ${this.translationMap[direction]()}`
        ]);
      }
    }
  }

  shoot() {
    const { arrows, direction, playerPosition, board } = this.model.getModel();
    if(this.model.getProperty('arrows') !== 0) {
      this.model.updateProperty('arrows', arrows - 1);
      if(arrowImpactInWumpu(direction, playerPosition, board)) {
        this.model.updateProperty('state', GameState.Win);
      } else {
        this.model.updateProperty('messages',
          [
            ...this.model.getProperty('messages'),
            `Flecha lanzada dirección ${ this.translationMap[direction]()}`,
            `Tienes disponibles ${ this.model.getProperty('arrows')} flechas`
          ]);
      }
    }
  }

  private calculateMovement(board: Cell[][], playerPosition: [number, number], newPosition: [number, number])
  : { board: Cell[][], playerPosition: [number, number] } {
      return {
        board: updateBoard(newPosition, board, playerPosition),
        playerPosition: newPosition
      };
  }

}
