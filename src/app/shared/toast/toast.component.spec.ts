/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import {ToastService} from "./toast.service";

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

  it('should show a toast message', () => {
    let fixture = TestBed.createComponent(ToastComponent);
    service.add('info', 'someTitle', 'someMessage');
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.alert').textContent).toContain('someTitle');
    expect(compiled.querySelector('.alert').textContent).toContain('someMessage');

  });

  /*it(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(ToastComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(ToastComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));*/
});
