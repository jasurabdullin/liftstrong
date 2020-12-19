import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { ExerciseService } from '../../_services/exercise.service';

import * as exerciseReducer from '../../_reducers/exercises.reducer';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  activeExercise$: Observable<boolean>;

  constructor(
    private exerciseService: ExerciseService,
    private store: Store<exerciseReducer.State>
  ) { }

  ngOnInit(): void {
    this.activeExercise$ = this.store.select(exerciseReducer.getActiveExerciseState);
  }

}
