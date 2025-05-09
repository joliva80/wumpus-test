import { TestBed } from '@angular/core/testing';
import { AppModel} from '../../models';
import { GameManager } from './game.manager';


describe('GameManager', () => {
  let manager: GameManager;
  let model: jasmine.SpyObj<AppModel>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameManager,
        {
          provide: AppModel,
          useValue: {
            updateProperty: jasmine.createSpy('updateProperty'),
            getProperty: jasmine.createSpy('getProperty'),
            getModel: jasmine.createSpy('getModel'),
          },
        }
      ],
    });
    manager = TestBed.inject(GameManager);
    model = TestBed.inject(AppModel) as jasmine.SpyObj<AppModel>;
  });

  it('should be created', () => {
    expect(manager).toBeTruthy();
  });
});
