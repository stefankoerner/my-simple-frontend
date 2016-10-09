/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ListComponent } from './list.component';
import {DetailsComponent} from "./details/details.component";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {ApartmentsService} from "../apartments.service";
import {ApartmentsServiceMock} from "../apartments.service.mock";

describe('Component: List', () => {
  /*beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        ListComponent,
        DetailsComponent
      ],
      providers: [
        {provide: ApartmentsService, useClass: ApartmentsServiceMock}
      ]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(ListComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });*/
});
