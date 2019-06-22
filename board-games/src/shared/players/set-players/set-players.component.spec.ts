import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPlayersComponent } from './set-players.component';

describe('SetPlayersComponent', () => {
  let component: SetPlayersComponent;
  let fixture: ComponentFixture<SetPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
