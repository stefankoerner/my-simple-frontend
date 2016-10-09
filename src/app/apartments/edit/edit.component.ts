import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {FormBuilder, FormGroup, FormControl, Validator, Validators} from "@angular/forms";
import {ApartmentsService, Apartment} from "../apartments.service";
import {Subscription, Observable} from "rxjs/Rx";
import {ToastService} from "../../shared/toast/toast.service";
import {TimerObservable} from "rxjs/observable/TimerObservable";

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
    private apartmentsService:ApartmentsService,
    private toastService: ToastService
  ) {}

  private form:FormGroup;
  
  private subscriptions:Subscription[] = [];

  private id: number;
  private token: string;
  private showDelete: boolean;

  ngOnInit() {

    Observable.combineLatest(
      this.route.queryParams.map(data => data['token'] || null),
      this.route.params.map(data => data['apartmentId'] || null)
    ).subscribe(params => {
      this.token = params[0];
      this.id = +params[1];

      if (!this.token || !this.id) {
        this.toastService.add('danger', 'Error', 'Invalid url params');
        this.router.navigate(['apartments']);
        return;
      }

      this.subscriptions.push(this.apartmentsService.getById(this.id, this.token).subscribe((data: Apartment) => {
        this.form = this.formBuilder.group({
          'line1': [data.line1],
          'line2': [data.line2],
          'street': [data.street],
          'no': [data.no],
          'country': [data.country],
          'zip': [data.zip],
          'city': [data.city],
          'email': [data.email, [
            Validators.required,
            this.validateEmail
          ]],
        });
      }, error => {
        this.toastService.add('danger', 'Error!', error.text());
        this.router.navigate(["apartments"]);
      }))
    });
  }

  private onCancel():boolean {
    TimerObservable.create().subscribe(() => {
      this.router.navigate(["apartments"]);
    });
    return false;
  }

  private onSave():boolean {
    this.apartmentsService.update(this.id, this.token, this.form).then(result => {
      if (result.success) {
        this.toastService.add('success', 'Saved!', 'The entry has been successfully updated.')
      }
      else {
        this.toastService.add('danger', 'Error!', result.message);
      }
      TimerObservable.create().subscribe(() => {
        this.router.navigate(["apartments"]);
      });
    });
    return false;
  }

  private onDelete(confirmed:boolean):boolean {
    this.showDelete = false;
    if (confirmed) {
      this.apartmentsService.delete(this.id, this.token).then(result => {
        if (result.success) {
          this.toastService.add('warning', 'Done!', 'The entry has been successfully deleted.')
        }
        else {
          this.toastService.add('danger', 'Error!', result.message);
        }
        TimerObservable.create().subscribe(() => {
          this.router.navigate(["apartments"]);
        });
      });
    }
    return false;
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
