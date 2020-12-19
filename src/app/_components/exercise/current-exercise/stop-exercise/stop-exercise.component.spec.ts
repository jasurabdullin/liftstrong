import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopExerciseComponent } from './stop-exercise.component';

describe('StopExerciseComponent', () => {
  let component: StopExerciseComponent;
  let fixture: ComponentFixture<StopExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StopExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
