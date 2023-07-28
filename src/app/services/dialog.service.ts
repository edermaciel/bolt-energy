import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components';
import { DialogData } from '../shared';

@Injectable({
    providedIn: 'root',
})
export class DialogService {

    constructor(private dialog: MatDialog) { }

    openDialog(data: DialogData): void {
        this.dialog.open(DialogComponent, {
            width: '100%', // Set the width of the dialog as per your requirement
            data
        });
    }

    closeDialog(): void {
        this.dialog.closeAll();
    }
}
