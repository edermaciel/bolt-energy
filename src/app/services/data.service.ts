import { Injectable } from '@angular/core';
import { Observable, map, BehaviorSubject, catchError } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { State, User } from '../shared';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private updateData: BehaviorSubject<boolean> = new BehaviorSubject(false);
    tableUpdated = this.updateData.asObservable();

    usersCollection: AngularFirestoreCollection<User>;
    users: Observable<User[]>;
    userDoc?: AngularFirestoreDocument<User>;

    constructor(public afs: AngularFirestore, private httpClient: HttpClient) {
        this.usersCollection = this.afs.collection('users');

        this.users = this.usersCollection.snapshotChanges().pipe(map((changes: any) => {
            return changes.map((a: any) => {
                const data = a.payload.doc.data() as User;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    getUsers() {
        return this.users;
    }

    addUser(user: User) {
        this.usersCollection.add(user);
    }

    deleteUser(user: User) {
        this.userDoc = this.afs.doc(`users/${user.id}`);
        this.userDoc.delete();
    }

    updateUser(user: User) {
        this.userDoc = this.afs.doc(`users/${user.id}`);
        this.userDoc.update(user);
    }

    updateTable(status: boolean) {
        this.updateData.next(status);
    }

    getStates(): Observable<State[]> {
        return this.httpClient.get<State[]>(environment.stateUrl);
    }
}
