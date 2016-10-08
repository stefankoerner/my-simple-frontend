
import {Injectable} from "@angular/core";
import {Observable, Observer} from "rxjs/Rx";
import {FormGroup} from "@angular/forms";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Http} from "@angular/http";

export class Apartment {
  id: number;
  line1: string;
  line2: string;
  street: string;
  no: string;
  country: string;
  zip: string;
  city: string;
  email: string;
  created: number;

  public static of(data:any):Apartment {
    return Object.assign(new Apartment(), data);
  }

  public getPlace() {
    return [
      this.country ? this.country + " -" : false,
      !!this.zip ? this.zip : false,
      !!this.city ? this.city : false
    ].filter(item => item !== false).join(" ");
  }

  public getDate():string {
    if (this.created) {
      let date = new Date(this.created);
      return date.toLocaleString();
    }
    else {
      return null;
    }
  }
}

export abstract class ApartmentsServiceBase {
  abstract getList(page:number, limit:number, filter:{[key:string]:string}): Observable<Array<Apartment>>;
  abstract add(form:FormGroup): Promise<{success:boolean, message?:string}>;
  abstract update(id:number, token:string, form:FormGroup): Promise<{success:boolean, message?:string}>;
  abstract getById(id:number):Observable<Apartment>;
}

@Injectable()
export class ApartmentsService extends ApartmentsServiceBase {

  private host = 'http://127.0.0.1:4202';

  constructor(private http:Http) {
    super();
  }

  getList(page: number, limit: number, filter: {}): Observable<Array<Apartment>> {
    return this.http.get(this.host + '/apartments')
      .map(response => response.json()['apartments']
        .map(item => Apartment.of(item))
      );
  }

  add(form: FormGroup): Promise<{success: boolean; message?: string}> {
    return new Promise(resolve => {
      resolve({success:true});
    });
  }

  update(id: number, token: string, form: FormGroup): Promise<{success: boolean; message?: string}> {
    return new Promise(resolve => {
      resolve({success:true});
    });
  }

  getById(id: number): Observable<Apartment> {
    return Observable.of(Apartment.of({}));
  }

}