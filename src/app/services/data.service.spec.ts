import { TestBed } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { BehaviorSubject, of } from 'rxjs';
import { User, State } from '../shared';
import { HttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

const dummyUsers: User[] = [{
    cpf: '123',
    estado: 'MG',
    id: '123123',
    idade: 0,
    nome: 'Joao',
    sexo: 'masculino'
}];

describe('DataService', () => {
    let service: DataService;
    let afs: AngularFirestore;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFirestoreModule
            ],
            providers: [
                DataService,
                AngularFirestore,
            ],
        });
        service = TestBed.inject(DataService);
        afs = TestBed.inject(AngularFirestore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get users', () => {
        spyOn(afs, 'collection').and.returnValue({
            snapshotChanges: () => ({
                pipe: () => ({ subscribe: (fn: any) => fn(dummyUsers) }),
            }),
        } as AngularFirestoreCollection<User>);

        const users$ = service.getUsers();
        let users: User[] = [];
        users$.subscribe((data) => (users = data));
        expect(users).toBeTruthy();
        expect(users$).toBeTruthy();
    });

    it('should add a user', () => {
        afs.collection('users').add(dummyUsers[0]);
        spyOn(service, 'addUser').and.callThrough().withArgs(dummyUsers[0]);
    });

    it('should delete a user', () => {
        const mockDoc = jasmine.createSpyObj<AngularFirestoreDocument<User>>('userDoc', ['delete']);
        spyOn(afs, 'doc').and.returnValue(mockDoc);

        service.deleteUser(dummyUsers[0]);

        expect(afs.doc).toHaveBeenCalled();
        expect(mockDoc.delete).toHaveBeenCalled();
    });

    it('should update a user', () => {
        const mockDoc = jasmine.createSpyObj<AngularFirestoreDocument<User>>('userDoc', ['update']);
        spyOn(afs, 'doc').and.returnValue(mockDoc);

        service.updateUser(dummyUsers[0]);

        expect(mockDoc.update).toHaveBeenCalledWith(dummyUsers[0]);
    });

    it('should update table status', () => {
        service.updateTable(true);
        service.tableUpdated.subscribe((data: any) => { expect(data).toBeTrue() });
    });

    it('should get states', () => {
        const states = service.getStates();
        expect(states).toBeTruthy();
    });
});
