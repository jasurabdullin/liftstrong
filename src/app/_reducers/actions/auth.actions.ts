import { Action } from '@ngrx/store';

export const AUTHENTICATE = 'Authenticate';
export const DENY_ACCESS = 'Deny Access';

export class Authenticate implements Action {
    readonly type = AUTHENTICATE;
}

export class DenyAccess implements Action {
    readonly type = DENY_ACCESS;
}

export type AuthActions = Authenticate | DenyAccess;
