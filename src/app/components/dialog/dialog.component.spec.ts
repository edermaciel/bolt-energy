import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DataService, DialogService } from 'src/app/services';
import { State, User } from 'src/app/shared';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

const dummyUsers: User[] = [{
    cpf: '123',
    estado: 'MG',
    id: '123123',
    idade: 0,
    nome: 'Joao',
    sexo: 'masculino'
}];

const dummyStates: State[] = [
    { id: 1, nome: 'Minas Gerais', sigla: 'MG' },
];

describe('DialogComponent', () => {
    let component: DialogComponent;
    let dialogService: DialogService;
    let fixture: ComponentFixture<DialogComponent>;
    let dataService: DataService;
    const mockDialogData = {
        action: 'add',
        userData: null,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MatDialogModule,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFirestoreModule,
                HttpClientModule
            ],
            declarations: [DialogComponent],
            providers: [
                DialogService,
                DataService,
                FormBuilder,
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: mockDialogData,
                },
            ],
        });

        dialogService = TestBed.inject(DialogService);
        dataService = TestBed.inject(DataService);
        component = TestBed.createComponent(DialogComponent).componentInstance;
        fixture = TestBed.createComponent(DialogComponent);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form and fetch states on ngOnInit', () => {
        spyOn(dataService, 'getStates').and.returnValue(of(dummyStates));

        component.ngOnInit();

        expect(component.statesList).toEqual(dummyStates);
        expect(dataService.getStates).toHaveBeenCalledTimes(1);
        expect(component.userForm).toBeTruthy();
    });

    it('should patch form values on ngOnInit for update action', () => {
        const mockUpdateActionData = {
            action: 'update',
            userData: dummyUsers[0],
        };
        spyOn(dataService, 'getStates').and.returnValue(of([]));

        component.data = mockUpdateActionData;
        component.ngOnInit();


        expect(component.data.userData?.cpf).toBe(dummyUsers[0].cpf);
        expect(component.data.userData?.id).toBe(dummyUsers[0].id);
        expect(component.data.userData?.idade).toBe(dummyUsers[0].idade);
        expect(component.data.userData?.nome).toBe(dummyUsers[0].nome);
        expect(component.data.userData?.estado).toBe(dummyUsers[0].estado);
        expect(component.data.userData?.sexo).toBe(dummyUsers[0].sexo);
    });

    it('should initialize form with default fields on ngOnInit for add action', () => {
        spyOn(dataService, 'getStates').and.returnValue(of([]));

        component.ngOnInit();

        const defaultFields = {
            nome: '',
            idade: 0,
            cpf: '',
            estado: '',
            sexo: '',
        };
        expect(component.userForm.value).toEqual(defaultFields);
        expect(component.selectedState).toBe('');
        expect(component.selectedSex).toBe('');
    });

    it('should not save user and not close dialog on saveUser', () => {
        component.data = { ...mockDialogData, action: 'add' };
        component.ngOnInit();
        component.userForm.patchValue(dummyUsers[0]);

        component.saveUser();

        expect(component.showInvalidMessage).toBeTrue()
    });

    it('should save user and close dialog on saveUser', () => {
        spyOn(component, 'saveUser');

        component.data = { ...mockDialogData, action: 'add' };
        component.ngOnInit();
        component.userForm.patchValue(dummyUsers[0]);
        fixture.detectChanges()

        // Set values for sexSelect and stateSelect using componentRef.nativeElement        
        const sexSelectElement: HTMLSelectElement = fixture.debugElement.query(
            By.css('#sexo')
        ).nativeElement;
        sexSelectElement.options.item(1)!.selected = true;
        sexSelectElement.dispatchEvent(new Event('change'));

        const stateSelectElement: HTMLSelectElement = fixture.debugElement.query(
            By.css('#estadoSelect')
        ).nativeElement;
        stateSelectElement.options.item(0)!.value = 'MG';
        stateSelectElement.options.item(0)!.selected = true;
        stateSelectElement.dispatchEvent(new Event('change'));

        component.showInvalidMessage = false; // Resetting the showInvalidMessage for this test
        component.saveUser();

        expect(component.saveUser).toHaveBeenCalled();
        expect(component.showInvalidMessage).toBeFalse();
    });

    it('should show invalid message if form is invalid on saveUser', () => {
        spyOn(dataService, 'addUser');
        spyOn(dialogService, 'closeDialog');

        component.data = { ...mockDialogData, action: 'add' };
        component.ngOnInit();
        component.showInvalidMessage = false; // Resetting the showInvalidMessage for this test
        component.userForm.patchValue({ nome: 'John Doe' }); // Form is still invalid

        component.saveUser();

        expect(component.showInvalidMessage).toBe(true);
    });
});
