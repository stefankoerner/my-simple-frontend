
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

export type Apartment = {
  id: number,
  name: string
}

export abstract class ApartmentsServiceBase {
  public getList(page:number, limit:number, filter:string): Observable<Array<Apartment>> {

    let data = [];
    let start = page*limit;
    for (let i=start; i<start+limit; i++) {
      data.push(
        {id:(i+1), name:"test"+(i+1)},
      );
    }

    return Observable.of(data).delay(1000);
  }
}

@Injectable()
export class ApartmentsService extends ApartmentsServiceBase {

}