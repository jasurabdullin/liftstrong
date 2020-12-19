import { Action } from '@ngrx/store';

export const STOP_LOADING = 'Stop Loading';
export const START_LOADING = 'Start Loading';

export class StartLoading implements Action {
    readonly type = START_LOADING;
}

export class StopLoading implements Action {
    readonly type = STOP_LOADING;
}

export type UIActions = StartLoading | StopLoading;
