
import {Injectable} from "@angular/core";
import {Observable, Observer} from "rxjs/Rx";
import {FormGroup} from "@angular/forms";
import {TimerObservable} from "rxjs/observable/TimerObservable";

export type ToastMessage = {
  type:string,
  title:string,
  message:string
}

@Injectable()
export class ToastService {

  private timeout = 5000;
  private _messages:Array<ToastMessage> = [];

  public messages: Observable<Array<ToastMessage>>;
  private messagesObserver: Observer<Array<ToastMessage>>;

  constructor() {
    this.messages = new Observable<Array<ToastMessage>>((observer:Observer<Array<ToastMessage>>) => {
      this.messagesObserver = observer;
    });
  }

  public add(type:string, title: string, message:string) {
    this._messages.unshift({type:type, title: title, message:message});
    this.messagesObserver.next(this._messages);
    TimerObservable.create(this.timeout).subscribe(() => {
      this._messages.pop();
      this.messagesObserver.next(this._messages);
    });
  }
}