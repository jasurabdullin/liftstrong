import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from './shared.module';
import { ExerciseRoutingModule } from '../_routes/exercise-routing.module';

import { ExerciseComponent } from '../_components/exercise/exercise.component';
import { NewExerciseComponent } from '../_components/exercise/new-exercise/new-exercise.component';
import { PastExerciseComponent } from '../_components/exercise/past-exercise/past-exercise.component';
import { CurrentExerciseComponent } from '../_components/exercise/current-exercise/current-exercise.component';
import { StopExerciseComponent } from '../_components/exercise/current-exercise/stop-exercise/stop-exercise.component';
import { exerciseReducer } from '../_reducers/exercises.reducer';

@NgModule({
    declarations: [
        ExerciseComponent,
        CurrentExerciseComponent,
        NewExerciseComponent,
        PastExerciseComponent,
        StopExerciseComponent,
    ],
    imports: [
        SharedModule,
        ExerciseRoutingModule,
        StoreModule.forFeature('exercise', exerciseReducer),
    ],
    exports: [],
    entryComponents: [StopExerciseComponent]
})
export class ExerciseModule  {}
