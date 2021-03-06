import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Routes, RouterModule} from "@angular/router";
import {AddComponent} from "./add.component";
import {ApartmentFormModule} from "../../shared/apartment-form/apartment-form.module";

const routes: Routes = [
  {
    path: '',
    component: AddComponent
  }
];

@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ApartmentFormModule
  ],
  bootstrap: [AddComponent]
})
export class AddModule { }