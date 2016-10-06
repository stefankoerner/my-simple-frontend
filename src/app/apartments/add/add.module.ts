import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Routes, RouterModule} from "@angular/router";
import {AddComponent} from "./add.component";

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
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ],
  bootstrap: [AddComponent]
})
export class AddModule { }