import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components';

@Injectable({
    providedIn: 'root',
})
export class DialogService {

    constructor(private dialog: MatDialog) { }

    openDialog(data: any): void {
        this.dialog.open(DialogComponent, {
            width: '100%', // Set the width of the dialog as per your requirement
            data
        });
    }

    closeDialog(): void {
        this.dialog.closeAll();
    }
}
