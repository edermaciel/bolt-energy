import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageComponent } from './homepage.component';
import { AllUsersModule } from '../all-users';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        HomepageComponent
    ],
    imports: [
        CommonModule,
        AllUsersModule,
        MatToolbarModule,
        MatIconModule
    ],
})
export class HomepageModule { }
