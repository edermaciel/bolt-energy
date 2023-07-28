import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageComponent } from './homepage.component';
import { AllUsersModule } from '../all-users';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
@NgModule({
    declarations: [
        HomepageComponent
    ],
    imports: [
        CommonModule,
        AllUsersModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        RouterModule
    ],
})
export class HomepageModule { }
