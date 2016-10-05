import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {ListComponent} from "./list/list.component";

const apartmentsRoutes: Routes = [
  {
    path: '',
    component: ListComponent
  }
];
export const apartmentsRouting: ModuleWithProviders = RouterModule.forChild(apartmentsRoutes);