
import {Injectable} from "@angular/core";
import {ApartmentsServiceBase, Apartment} from "./apartments.service";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable()
export class ApartmentsServiceMock extends ApartmentsServiceBase {
  private delay:number = 2000;
  private data:Array<Apartment> = [];

  constructor() {
    super();
  }

  private getData(): Array<Apartment> {
    if (this.data.length < 10) {
      for (let i=0; i<234; i++) {
        this.data.push(
          Apartment.of({
            id:(i+1),
            line1:"test"+(i+1),
            street: "Evergreen Terrace",
            no: "742",
            country: "DE",
            zip: 40000 + i,
            city: "Düsseldorf",
            email: "test+" + (i+1) + "@web.de",
            created: 1475932068000 + i * 1000
          })
        );
      }
    }
    return this.data;
  }

  public getList(page:number, limit:number, filter:{[key:string]:string}): Observable<Array<Apartment>> {
    return Observable.of(this.getData().slice(page*limit, page*limit + limit)).delay(this.delay);
  }

  public add(form:FormGroup): Promise<{success:boolean, message?:string}> {
    return new Promise<{success:boolean, message?:string}>(resolve => {
      let data:Apartment = Apartment.of(form.value);
      data.id = this.data.length;
      this.data.unshift(data);
      resolve({success:true});
    });
  }

  public update(id:number, token:string, form:FormGroup): Promise<{success:boolean, message?:string}> {
    return new Promise<{success:boolean, message?:string}>(resolve => {

      let data = this.data.find(apartment => {
        return apartment.id === id;
      });

      if (token === "asdf") {
        resolve({success:false, message: 'Invalid Token.'})
      }
      else if (!data) {
        resolve({success:false, message: 'Unknown Apartment ID.'})
      }
      else {
        Object.assign(data, form.value);
        resolve({success:true});
      }
    });
  }

  public getById(id:number):Observable<Apartment> {
    let apartment:Apartment = this.getData().find((item:Apartment) => item.id === +id);
    return Observable.of(apartment).delay(this.delay);
  }
}