import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Exercise } from 'src/app/_models/exercise.model';

import { UIService } from 'src/app/_services/ui.service';
import { ExerciseService } from 'src/app/_services/exercise.service';

import * as rootReducer from '../../../_reducers/app.reducer';
import * as exerciseReducer from '../../../_reducers/exercises.reducer';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.css']
})
export class NewExerciseComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private exerciseService: ExerciseService,
    private uiService: UIService,
    private store: Store<exerciseReducer.State>,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(rootReducer.getLoadingState);
    this.exercises$ = this.store.select(exerciseReducer.getAllExercises);
    this.getExercises();
  }

  getExercises(): void {
    this.exerciseService.getExercises();
  }

  onStartExercise(form: NgForm): void {
    this.exerciseService.startExercise(form.value.exercise);
  }

}
