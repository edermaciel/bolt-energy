import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../components';
import { DialogData } from '../shared';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
    let service: DialogService;
    let dialog: MatDialog;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule],
            providers: [DialogService],
        });
        service = TestBed.inject(DialogService);
        dialog = TestBed.inject(MatDialog);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should open dialog', () => {
        const data: DialogData = { action: 'add', userData: null };
        const dialogSpy = spyOn(dialog, 'open');

        service.openDialog(data);

        expect(dialogSpy).toHaveBeenCalledWith(DialogComponent, {
            width: '100%',
            data,
        });
    });

    it('should close dialog', () => {
        const dialogCloseAllSpy = spyOn(dialog, 'closeAll');

        service.closeDialog();

        expect(dialogCloseAllSpy).toHaveBeenCalled();
    });
});
