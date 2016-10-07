import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {ApartmentsService, Apartment} from "../apartments.service";
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private formBuilder:FormBuilder,
    private apartmentsService:ApartmentsService
  ) {}

  private form:FormGroup;
  
  private subscriptions:Subscription[] = [];

  ngOnInit() {
    this.route.params.forEach((params:Params) => {
      let id = params['apartmentId'];
      if (!isNaN(parseFloat(id)) && isFinite(id)) {
        this.subscriptions.push(this.apartmentsService.getById(id).subscribe((data:Apartment) => {
          this.form = this.formBuilder.group({
            'line1': [data.line1],
            'line2': [data.line2],
            'street': [data.street],
            'no': [data.no],
            'country': [data.country],
            'zip': [data.zip],
            'city': [data.city],
            'email': [data.email, [
              this.validateEmail
            ]],
          })
        }))
      }
    });
  }

  private validateEmail(c:FormControl) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return c.value === "" || EMAIL_REGEXP.test(c.value) ? null : {
      emailFormat: true
    };
  }

  ngOnDestroy() {
    let subscription;
    while (subscription = this.subscriptions.pop()) {
      subscription.unsubscribe();
    }
  }

}
