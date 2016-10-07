import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentFormComponent } from './apartment-form.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ApartmentFormComponent]
})
export class ApartmentFormModule { }
