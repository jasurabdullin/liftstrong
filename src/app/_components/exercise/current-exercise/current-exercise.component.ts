import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseService } from 'src/app/_services/exercise.service';

import { Exercise } from 'src/app/_models/exercise.model';
import * as exerciseReducer from '../../../_reducers/exercises.reducer';
import { StopExerciseComponent } from './stop-exercise/stop-exercise.component';

@Component({
  selector: 'app-current-exercise',
  templateUrl: './current-exercise.component.html',
  styleUrls: ['./current-exercise.component.css']
})
export class CurrentExerciseComponent implements OnInit {

  progress = 0;
  timer: any;

  constructor(
    private dialog: MatDialog,
    private exerciseService: ExerciseService,
    private store: Store<exerciseReducer.State>,
  ) {}

  ngOnInit(): void {
    this.handleTimer();
  }

  handleTimer(): void {
    this.store.select(exerciseReducer.getActiveExercise).pipe(take(1)).subscribe((exercise: Exercise) => {
      const step = exercise.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100){
          this.exerciseService.completeExercise();
          clearInterval(this.timer);
        }
      }, step);
    });
  }

  onStopExercise(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopExerciseComponent, {
      data: { progress: this.progress }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm){
        this.exerciseService.cancelExercise(this.progress);
      } else {
        this.handleTimer();
      }
    });
  }

}
