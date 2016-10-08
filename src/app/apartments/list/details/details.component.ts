import {Component, OnInit, EventEmitter} from '@angular/core';
import {ApartmentsService, Apartment} from "../../apartments.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Input, Output} from "@angular/core";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() selectedId: number;
  @Output() onClose:EventEmitter<boolean> = new EventEmitter<boolean>();

  private data:Apartment;
  private sub:Subscription;

  constructor(private apartmentsService: ApartmentsService, private router:Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.apartmentsService.getById(this.selectedId).subscribe(data => this.data = data);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
