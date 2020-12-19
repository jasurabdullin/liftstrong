import {
    ExerciseActions,
    SET_ALL_EXERCISES,
    SET_COMPLETED_EXERCISES,
    START_EXERCISE,
    STOP_EXERCISE
} from './actions/exercises.actions';

import { Exercise } from '../_models/exercise.model';
import * as rootReducer from '../_reducers/app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ExerciseState {
    exercises: Exercise[];
    completedExercises: Exercise[];
    activeExercise: Exercise;
}

export interface State extends rootReducer.State {
    exercise: ExerciseState;
}

const initialState: ExerciseState = {
    exercises: [],
    completedExercises: [],
    activeExercise: null,
}

export function exerciseReducer(state = initialState, action: ExerciseActions): any {
    switch (action.type) {
        case SET_ALL_EXERCISES:
            return { ...state, exercises: action.payload };
        case SET_COMPLETED_EXERCISES:
            return { ...state, completedExercises: action.payload };
        case START_EXERCISE:
            return { 
                ...state,
                activeExercise: { ...state.exercises.find(exercise => exercise.id === action.payload) }
            };
        case STOP_EXERCISE:
            return { ...state, activeExercise: null};
        default:
            return state;
    }
}



export const getExerciseState = createFeatureSelector<ExerciseState>('exercise');

export const getAllExercises = createSelector(getExerciseState, (state: ExerciseState) => state.exercises);
export const getActiveExercise = createSelector(getExerciseState, (state: ExerciseState) => state.activeExercise);
export const getCompletedExercises = createSelector(getExerciseState, (state: ExerciseState) => state.completedExercises);
export const getActiveExerciseState = createSelector(getExerciseState, (state: ExerciseState) => state.activeExercise != null);


