import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as uiReducer from './ui.reducer';
import * as authReducer from './auth.reducer';

export interface State {
    ui: uiReducer.State;
    auth: authReducer.State;
}

export const reducers: ActionReducerMap<State> = {
    ui: uiReducer.uiReducer,
    auth: authReducer.authReducer,
};

export const uiState = createFeatureSelector<uiReducer.State>('ui');
export const getLoadingState = createSelector(uiState, uiReducer.getLoadingState);

export const authState = createFeatureSelector<authReducer.State>('auth');
export const getAuthState = createSelector(authState, authReducer.getAuthState);
