import { AuthActions, AUTHENTICATE, DENY_ACCESS } from './actions/auth.actions';

export interface State {
    isAuthenticated: boolean;
}

const initialState: State = {
    isAuthenticated: false,
}

export function authReducer(state = initialState, action: AuthActions): any {
    switch (action.type) {
        case AUTHENTICATE:
            return { isAuthenticated: true };
        case DENY_ACCESS:
            return { isAuthenticated: false};
        default:
            return state;
    }
}

export const getAuthState = (state: State) => state.isAuthenticated;
