import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllUsersComponent } from './all-users.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CpfFormatPipe } from 'src/app/pipes';

@NgModule({
  declarations: [AllUsersComponent, CpfFormatPipe],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [AllUsersComponent],
})
export class AllUsersModule { }
