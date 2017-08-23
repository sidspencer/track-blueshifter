import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybackRateComponent } from './playback-rate.component';

describe('PlaybackRateComponent', () => {
  let component: PlaybackRateComponent;
  let fixture: ComponentFixture<PlaybackRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybackRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybackRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
