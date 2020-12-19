import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UIService {

    constructor(private snackbar: MatSnackBar){}

    notify(message, action, duration): void {
        this.snackbar.open(message, action, {duration});
    }
}
