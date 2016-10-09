/* tslint:disable:no-unused-variable */

import {TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import {ToastService} from "./toast.service";
import {TimerObservable} from "rxjs/observable/TimerObservable";

describe('Component: Toast', () => {

  let service = new ToastService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToastComponent
      ],
      providers: [
        {provide: ToastService, useValue: service}
      ]
    });
  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(ToastComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
