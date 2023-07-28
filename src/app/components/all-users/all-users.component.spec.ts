import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllUsersComponent } from './all-users.component';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { DataService, DialogService } from 'src/app/services';
import { User } from 'src/app/shared';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';

const mockUsers: User[] = [{
    cpf: '123',
    estado: 'MG',
    id: '123123',
    idade: 0,
    nome: 'Joao',
    sexo: 'masculino'
}];


describe('AllUsersComponent', () => {
    let component: AllUsersComponent;
    let fixture: ComponentFixture<AllUsersComponent>;
    let dataService: DataService;
    let dialogService: DialogService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFirestoreModule,
                MatTableModule,
                MatDialogModule,
                HttpClientTestingModule,
                MatIconModule
            ],
            declarations: [AllUsersComponent],
            providers: [DialogService, DataService],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AllUsersComponent);
        component = fixture.componentInstance;
        dataService = TestBed.inject(DataService);
        dialogService = TestBed.inject(DialogService);

        spyOn(dataService, 'getUsers').and.returnValue(of(mockUsers));
    });

    it('should create', () => {
        component.ngOnInit();
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should update tableData and render rows on table update', () => {
        component.ngOnInit();
        fixture.detectChanges();

        // Simulate tableUpdated emission with true
        dataService.updateTable(true);

        fixture.detectChanges();

        expect(dataService.getUsers).toHaveBeenCalled();
        expect(component.tableData).toEqual([...mockUsers]);
        expect(component.isUpdateAction).toBeFalse();
    });

    it('should remove a user', () => {
        const selectedUser = mockUsers[0];
        component.selectedUser = selectedUser;

        spyOn(dataService, 'deleteUser').and.stub(); // You can also use .and.returnValue() if needed
        component.ngOnInit();
        fixture.detectChanges();
        component.removeUser();

        expect(dataService.deleteUser).toHaveBeenCalledWith(selectedUser);
        expect(component.tableData).not.toContain(selectedUser);
        // Add more assertions as needed
    });

    // it('should select a row', () => {
    //     const event = new Event('click');
    //     const selectedUser = mockUsers[0];
    //     const target = document.createElement('tr');
    //     spyOn(event, 'target').and.returnValue(target);

    //     component.selectRow(selectedUser, event);

    //     expect(component.selectedUser).toBe(selectedUser);
    //     expect(component.previousTarget).toBe(target.parentElement);        
    // });

    it('should call openDialog with action "update" and selectedUser', () => {
        const selectedUser = mockUsers[0];
        component.selectedUser = selectedUser;
        const openDialogSpy = spyOn(dialogService, 'openDialog').and.stub();
        component.ngOnInit();
        fixture.detectChanges();
        component.openDialog('update');

        expect(openDialogSpy).toHaveBeenCalledOnceWith({
            action: 'update',
            userData: selectedUser,
        });
    });
});
