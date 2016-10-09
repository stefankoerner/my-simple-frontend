import {Injectable} from "@angular/core";
import {Observable, Observer} from "rxjs/Rx";
import {FormGroup} from "@angular/forms";
import {Http, RequestOptions, URLSearchParams} from "@angular/http";

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

  public static of(data: any): Apartment {
    return Object.assign(new Apartment(), data);
  }

  public getPlace() {
    return [
      this.country ? this.country + " -" : false,
      !!this.zip ? this.zip : false,
      !!this.city ? this.city : false
    ].filter(item => item !== false).join(" ");
  }

  public getDate(): string {
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
  abstract getList(page: number, limit: number, filter: {[key: string]: string}): Observable<Array<Apartment>>;

  abstract add(form: FormGroup): Promise<{success: boolean, message?: string}>;

  abstract update(id: number, token: string, form: FormGroup): Promise<{success: boolean, message?: string}>;

  abstract getById(id: number): Observable<Apartment>;

  abstract delete(id: number, token: string): Promise<{success: boolean; message?: string}>;
}

@Injectable()
export class ApartmentsService extends ApartmentsServiceBase {

  private host = location.protocol + '//' + window.location.hostname + ':4202';

  constructor(private http: Http) {
    super();
  }

  getList(page: number, limit: number, filter: {}): Observable<Array<Apartment>> {
    let params = new URLSearchParams();
    params.append("page", page + '');
    params.append("limit", limit + '');
    if (!!filter['name']) {
      params.append("filterLine1", filter['name']);
    }
    if (!!filter['email']) {
      params.append("filterEmail", filter['email']);
    }

    let requestOptions: RequestOptions = new RequestOptions({
      search: params
    });
    return this.http.get(this.host + '/apartments', requestOptions)
      .map(response => response.json()['apartments']
        .map(item => Apartment.of(item))
    );
  }

  add(form: FormGroup): Promise<{success: boolean; message?: string}> {
    return new Promise(resolve => {
      this.http.post(this.host + '/apartments', form.getRawValue()).subscribe(result => {
        resolve({success: result.ok});
      }, error => {
        resolve({success: false, message: error.text()});
      });
    });
  }

  update(id: number, token: string, form: FormGroup): Promise<{success: boolean; message?: string}> {
    return new Promise(resolve => {
      this.http.put(this.host + '/apartments/' + id + '?token=' + token, form.getRawValue()).subscribe(result => {
        resolve({success: result.ok});
      }, error => {
        resolve({success: false, message: error.text()});
      });
    });
  }

  getById(id: number, token?:string): Observable<Apartment> {
    return this.http.get(this.host + '/apartments/' + id + (token ? '?token=' + token : ''))
      .map(response => Apartment.of(response.json()['apartment']));
  }

  delete(id: number, token: string): Promise<{success: boolean; message?: string}> {
    return new Promise(resolve => {
      this.http.delete(this.host + '/apartments/' + id + '?token=' + token).subscribe(result => {
        resolve({success: result.ok});
      }, error => {
        resolve({success: false, message: error.text()});
      });
    });
  }

}