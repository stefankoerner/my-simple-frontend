import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ApartmentsService} from "./apartments.service";
import {environment} from "../../environments/environment";
import {ApartmentsServiceMock} from "./apartments.service.mock";
import {Routes, RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";

const routes: Routes = [
  {
    path: 'add',
    loadChildren: 'app/apartments/add/add.module#AddModule'
  },
  {
    path: '',
    loadChildren: 'app/apartments/list/list.module#ListModule'
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    {provide: ApartmentsService, useClass: (environment.production ? ApartmentsService : ApartmentsServiceMock)}
  ],
  bootstrap: []
})
export class ApartmentsModule { }