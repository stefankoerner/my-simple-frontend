import { Component, OnInit } from '@angular/core';
import {ApartmentsService, Apartment} from "../apartments.service";
import {Subscription, Observable} from 'rxjs';
import {TimerObservable} from "rxjs/observable/TimerObservable";
declare var jQuery:any;

@Component({
  selector: 'app-apartments-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  host: {'(window:scroll)': 'loadListContinue()'},

})
export class ListComponent implements OnInit {

  private page:number;
  private limit:number;
  private filter:string;
  private list:Array<Apartment>;
  private loading:boolean;
  private endReached:boolean;

  constructor(private apartmentsService: ApartmentsService) { }

  ngOnInit() {
    this.page = 0;
    this.limit = 20;
    this.filter = "";
    this.list = [];
    this.loading = false;
    this.endReached = false;

    this.loadList().subscribe(list => {
      this.appendList(list);
    });
  }

  private appendList(list:Array<Apartment>) {
    this.list.push(...list);
    this.endReached = list.length < this.limit;
    this.loading = false;
    TimerObservable.create().subscribe(() => {
      this.loadListContinue();
    });
  }

  private filterChangedTimer:Subscription;
  private filterChanged(event):void {
    if (!!this.filterChangedTimer) {
      this.filterChangedTimer.unsubscribe();
    }
    this.filterChangedTimer = TimerObservable.create(1000).subscribe(() => {
      this.filterChangedTimer.unsubscribe();
      this.page = 0;
      this.filter = event;
      this.loadList().subscribe(list => {
        this.list = [];
        this.appendList(list);
      })
    });
  }


  private loadList():Observable<Array<Apartment>> {
    this.loading = true;
    return this.apartmentsService.getList(this.page, this.limit, this.filter);
  }

  private loadListContinue() {
    if (false === this.loading && false === this.endReached) {

      let table = jQuery("app-apartments-list:first");
      let viewport = jQuery( window );
      let scrollBottom =  table.offset().top + table.height() - viewport.scrollTop() - viewport.height();
      if (scrollBottom <= 200) {
        this.page++;
        this.loadList().subscribe(list => {
          this.appendList(list);
        })
      }
    }
  }
}
