import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { GameManager } from '../game/game.manager';
import { Actions } from '../../models';
import { signal } from '@angular/core';
import {KeyboardControlsManager} from './keyboard.manager';

describe('KeyboardControlsManager', () => {
  let manager: KeyboardControlsManager;
  let mockDocument: Document;
  let mockGameManager: jasmine.SpyObj<GameManager>;

  beforeEach(() => {
    mockGameManager = jasmine.createSpyObj('GameManager', ['movePlayer']);
    mockDocument = {
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener'), // Mock if needed
    } as any;

    TestBed.configureTestingModule({
      providers: [
        KeyboardControlsManager,
        {provide: DOCUMENT, useValue: mockDocument},
        {provide: GameManager, useValue: mockGameManager},
      ],
    });

    manager = TestBed.inject(KeyboardControlsManager);
  });

  it('should be created', () => {
    expect(manager).toBeTruthy();
  });

  it('should add keydown and keyup event listeners to the document on creation', () => {
    expect(mockDocument.addEventListener).toHaveBeenCalledWith('keydown', jasmine.any(Function));
    expect(mockDocument.addEventListener).toHaveBeenCalledWith('keyup', jasmine.any(Function));
  });

  describe('handleKeyDown', () => {
    it('should set isUpPressed to true when "w" key is pressed', () => {
      const event = new KeyboardEvent('keydown', { key: 'w' });
      (manager as any).handleKeyDown(event);
      expect(manager.isUpPressed()).toBeTrue();
    });

    it('should set isDownPressed to true when "s" key is pressed', () => {
      const event = new KeyboardEvent('keydown', { key: 's' });
      (manager as any).handleKeyDown(event);
      expect(manager.isDownPressed()).toBeTrue();
    });

    it('should set isLeftPressed to true when "a" key is pressed', () => {
      const event = new KeyboardEvent('keydown', { key: 'a' });
      (manager as any).handleKeyDown(event);
      expect(manager.isLeftPressed()).toBeTrue();
    });

    it('should set isRightPressed to true when "d" key is pressed', () => {
      const event = new KeyboardEvent('keydown', { key: 'd' });
      (manager as any).handleKeyDown(event);
      expect(manager.isRightPressed()).toBeTrue();
    });

    it('should set isShootPressed to true when " " key is pressed', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      (manager as any).handleKeyDown(event);
      expect(manager.isShootPressed()).toBeTrue();
    });
  });

  describe('handleKeyUp', () => {
    it('should set isUpPressed to false when "w" key is released', () => {
      manager.isUpPressed.set(true);
      const event = new KeyboardEvent('keyup', {key: 'w'});
      (manager as any).handleKeyUp(event);
      expect(manager.isUpPressed()).toBeFalse();
    });

    it('should set isDownPressed to false when "s" key is released', () => {
      manager.isDownPressed.set(true);
      const event = new KeyboardEvent('keyup', { key: 's' });
      (manager as any).handleKeyUp(event);
      expect(manager.isDownPressed()).toBeFalse();
    });

    it('should set isLeftPressed to false when "a" key is released', () => {
      manager.isLeftPressed.set(true);
      const event = new KeyboardEvent('keyup', { key: 'a' });
      (manager as any).handleKeyUp(event);
      expect(manager.isLeftPressed()).toBeFalse();
    });

    it('should set isRightPressed to false when "d" key is released', () => {
      manager.isRightPressed.set(true);
      const event = new KeyboardEvent('keyup', { key: 'd' });
      (manager as any).handleKeyUp(event);
      expect(manager.isRightPressed()).toBeFalse();
    });

    it('should set isShootPressed to false when " " key is released', () => {
      manager.isShootPressed.set(true);
      const event = new KeyboardEvent('keyup', { key: ' ' });
      (manager as any).handleKeyUp(event);
      expect(manager.isShootPressed()).toBeFalse();
    });
  });
  describe('actionAndResetKey', () => {
    it('should call gameManager.movePlayer with the given action and reset the key signal to false', () => {
      const mockKeySignal = signal(true);
      manager['actionAndResetKey'](Actions.Down, mockKeySignal);
      expect(mockGameManager.movePlayer).toHaveBeenCalledWith(Actions.Down);
      expect(mockKeySignal()).toBeFalse();
    });
  });
});
