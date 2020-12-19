import { Action } from '@ngrx/store';
import { Exercise } from 'src/app/_models/exercise.model';

export const SET_ALL_EXERCISES = 'All Exercises';
export const SET_COMPLETED_EXERCISES = 'Completed Exercises';
export const START_EXERCISE = 'Start Exercise';
export const STOP_EXERCISE = 'Stop Exercise';

export class SetAllExercises implements Action {
    readonly type = SET_ALL_EXERCISES;
    constructor(public payload: Exercise[]){}
}

export class SetCompletedExercises implements Action {
    readonly type = SET_COMPLETED_EXERCISES;
    constructor(public payload: Exercise[]){}
}

export class StartExercise implements Action {
    readonly type = START_EXERCISE;
    constructor(public payload: string){}
}

export class StopExercise implements Action {
    readonly type = STOP_EXERCISE;
}


export type ExerciseActions = SetAllExercises | SetCompletedExercises | StartExercise | StopExercise;
