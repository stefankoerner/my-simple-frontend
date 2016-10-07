import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Routes, RouterModule} from "@angular/router";
import {EditComponent} from "./edit.component";

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
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ],
  bootstrap: [EditComponent]
})
export class AddModule { }