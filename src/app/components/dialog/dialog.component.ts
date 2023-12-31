import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { DataService, DialogService } from 'src/app/services';
import { DialogData, State, User } from 'src/app/shared';
import { v4 as uuidv4 } from 'uuid';

const defaultFields: User = {
  cpf: '',
  estado: '',
  id: '',
  idade: 0,
  nome: '',
  sexo: ''
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent implements OnInit {
  @ViewChild('stateSelect') stateSelect?: ElementRef<HTMLSelectElement>;
  @ViewChild('sexSelect') sexSelect?: ElementRef<HTMLSelectElement>;

  userForm!: FormGroup;
  showInvalidMessage: boolean = false;
  statesList: State[] = [];
  sexList: string[] = ['masculino', 'feminino', 'outro'];
  selectedState: string = '';
  selectedSex: string = '';

  constructor(
    protected dialogService: DialogService, private formBuilder: FormBuilder,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.dataService.getStates().pipe(take(1)).subscribe((states: State[]) => {
      this.statesList = states
    });

    if (this.data.userData && this.data.action === 'update') {
      this.userForm.patchValue(this.data.userData);
      this.selectedState = this.data.userData.estado;
      this.selectedSex = this.data.userData.sexo;

    } else this.userForm.patchValue(defaultFields);
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      nome: ['', Validators.required],
      idade: [''],
      cpf: [''],
      estado: [''],
      sexo: [''],
    });
  }

  saveUser(): void {
    const sex = this.sexSelect?.nativeElement.selectedOptions.item(0)?.value;
    const state = this.stateSelect?.nativeElement.selectedOptions.item(0)?.value;
    if (this.userForm.valid && sex && state) {
      const userData: User = this.userForm.value;
      userData.sexo = sex;
      userData.estado = state;

      if (this.data.action === 'add') {
        userData.id = uuidv4();
        this.dataService.addUser(userData);
        this.dataService.updateTable(true);
      } else if (this.data.userData) {
        userData.id = this.data.userData.id;
        this.dataService.updateUser(userData);
      }
      this.dialogService.closeDialog();
    } else this.showInvalidMessage = true;
  }
}
