import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryComponent } from './memory.component';
import { MemoryService } from './memory.service';

fdescribe('MemoryComponent', () => {
  let component: MemoryComponent;
  let fixture: ComponentFixture<MemoryComponent>;
  let memoryService: MemoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ MemoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryComponent);
    component = fixture.componentInstance;
    memoryService = new MemoryService();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hold info that player setup is done', () => {
    component.startGame();
    expect(component.playerSetDone).toBeTruthy();
  });

  it('should create card array on selection of select which is equal to double of number selected', () => {
    component.noOfCards = 3;
    component.numberOfCardsSelected();
    expect(component.cardsArray.length).toEqual(6);
  });

  it('should inform parent component that game set up is done', () => {
    component.numberOfCardsSelected();
    expect(component.gameSetupDone).toBeTruthy();
  });

  it('should declare winner if un matched count is equal to zero', () => {
    component['unMatchedCount'] = 0;
    component.startNextRound();
    expect(component.declareWinner).toBeTruthy();
  });
});
