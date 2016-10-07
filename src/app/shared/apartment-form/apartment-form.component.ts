import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-apartment-form',
  templateUrl: './apartment-form.component.html',
  styleUrls: ['./apartment-form.component.scss']
})
export class ApartmentFormComponent implements OnInit {

  @Input('form') form: FormGroup;
  @Output() onSave:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onCancel:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
