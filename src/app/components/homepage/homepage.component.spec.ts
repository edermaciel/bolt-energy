import { DialogService } from 'src/app/services';
import { DialogData } from 'src/app/shared';
import { HomepageComponent } from './homepage.component';


describe('HomepageComponent', () => {
    let component: HomepageComponent;
    let dialogService: DialogService;

    beforeEach(() => {
        dialogService = jasmine.createSpyObj('DialogService', ['openDialog']);
        component = new HomepageComponent(dialogService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open dialog', () => {
        const action = 'add';
        const data: DialogData = { action, userData: null };
        component.openDialog(action);

        expect(dialogService.openDialog).toHaveBeenCalledWith(data);
    });
});
