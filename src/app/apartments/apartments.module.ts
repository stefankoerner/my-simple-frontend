import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {apartmentsRouting} from "./apartments.routing";
import {ListComponent} from "./list/list.component";
import {ApartmentsService} from "./apartments.service";
import {environment} from "../../environments/environment";
import {ApartmentsServiceMock} from "./apartments.service.mock";
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    EditComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    apartmentsRouting
  ],
  providers: [
    {provide: ApartmentsService, useClass: (environment.production ? ApartmentsService : ApartmentsServiceMock)}
  ],
  bootstrap: []
})
export class ApartmentsModule { }