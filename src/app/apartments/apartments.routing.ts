import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {ListComponent} from "./list/list.component";
import {AddComponent} from "./add/add.component";

const apartmentsRoutes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'add',
    component: AddComponent
  }
];
export const apartmentsRouting: ModuleWithProviders = RouterModule.forChild(apartmentsRoutes);