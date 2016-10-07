
import {Injectable} from "@angular/core";
import {Observable, Observer} from "rxjs/Rx";
import {FormGroup} from "@angular/forms";
import {TimerObservable} from "rxjs/observable/TimerObservable";

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
}

export abstract class ApartmentsServiceBase {

  private delay:number = 2000;

  private data = [];

  private getData(): Array<Apartment> {
    if (this.data.length < 10) {
      for (let i=0; i<234; i++) {
        this.data.push(
          Apartment.of({
            id:(i+1),
            line1:"test"+(i+1),
            country: "DE",
            zip: 1000 + i,
            city: "Düsseldorf",
            email: "test+" + (i+1) + "@web.de"
          })
        );
      }
    }
    return this.data;
  }

  public getList(page:number, limit:number, filter:{[key:string]:string}): Observable<Array<Apartment>> {
    return Observable.of(this.getData().slice(page*limit, page*limit + limit)).delay(this.delay);
  }

  public add(form:FormGroup) {
    let data:Apartment = Apartment.of(form.value);
    data.id = this.data.length;
    this.data.unshift(data);
  }

  public getById(id:number) {
    let apartment:Apartment = this.getData().find((item:Apartment) => item.id === +id);
    return Observable.of(apartment).delay(this.delay);
  }
}

@Injectable()
export class ApartmentsService extends ApartmentsServiceBase {

}