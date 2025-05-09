import { Injectable, signal, effect, Inject, WritableSignal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GameManager } from '../game/game.manager';
import {Actions} from '../../models';

export interface KeyActions {
  [key: string]: any;
}

@Injectable()
export class KeyboardControlsManager {
  readonly isUpPressed = signal(false);
  readonly isDownPressed = signal(false);
  readonly isLeftPressed = signal(false);
  readonly isRightPressed = signal(false);
  readonly isShootPressed = signal(false);

  readonly keyBindings: KeyActions = {
    'w': (value: boolean) => this.isUpPressed.set(value),
    's': (value: boolean) => this.isDownPressed.set(value),
    'a': (value: boolean) => this.isLeftPressed.set(value),
    'd': (value: boolean) => this.isRightPressed.set(value),
    ' ': (value: boolean) => this.isShootPressed.set(value),
  };

  constructor(
    @Inject(DOCUMENT) document: Document,
    private gameManager: GameManager,
  ) {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);

    effect(() => {
      if (this.isUpPressed()) this.actionAndResetKey(Actions.Up, this.isUpPressed);
      if (this.isDownPressed()) this.actionAndResetKey(Actions.Down, this.isDownPressed);
      if (this.isLeftPressed()) this.actionAndResetKey(Actions.Left, this.isLeftPressed);
      if (this.isRightPressed()) this.actionAndResetKey(Actions.Right, this.isRightPressed);
      if (this.isShootPressed()) {
        this.gameManager.shoot();
        this.isShootPressed.set(false);
      }
    });
  }

  private actionAndResetKey(action: Actions, key: WritableSignal<boolean>) {
    this.gameManager.movePlayer(action);
    key.set(false);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const key: string = event.key.toLowerCase();
    if(this.keyBindings[key]) this.keyBindings[key](true);
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    const key: string = event.key.toLowerCase();
    if(this.keyBindings[key]) this.keyBindings[key](false);
  };
}
