import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemoveUnderscorePipe } from './remove-underscore-pipe';
import { CustomDatePipe } from './custom.datepipe';
import { CustomDateAndTimePipe } from './custom.datepipe';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RemoveUnderscorePipe,
        CustomDatePipe,
        CustomDateAndTimePipe
    ],
    exports: [
        RemoveUnderscorePipe,
        CustomDatePipe,
        CustomDateAndTimePipe
    ]
})
export class PipesModule { }
