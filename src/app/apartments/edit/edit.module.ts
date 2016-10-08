import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Routes, RouterModule} from "@angular/router";
import {EditComponent} from "./edit.component";
import {ApartmentFormModule} from "../../shared/apartment-form/apartment-form.module";

const routes: Routes = [
  {
    path: '',
    component: EditComponent
  }
];

@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ApartmentFormModule
  ],
  bootstrap: [EditComponent]
})
export class EditModule { }