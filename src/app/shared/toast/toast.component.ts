import { Component, OnInit } from '@angular/core';
import {ToastService, ToastMessage} from "./toast.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  public messages:Array<ToastMessage> = [];

  private capitalizeFirstLetter(text:string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  constructor(private toastService:ToastService) { }

  ngOnInit() {
    this.toastService.messages.subscribe(messages => this.messages = messages);
  }

}
