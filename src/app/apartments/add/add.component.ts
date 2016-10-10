import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {ApartmentsService} from "../apartments.service";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {ToastService} from "../../shared/toast/toast.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private formBuilder:FormBuilder,
    private apartmentsService:ApartmentsService,
    private toastService: ToastService
  ) {}

  private form:FormGroup;
  private loading:boolean;

  ngOnInit() {
    this.form = this.formBuilder.group({
      'line1': [''],
      'line2': [''],
      'street': [''],
      'no': [''],
      'country': ['DE'],
      'zip': [''],
      'city': [''],
      'email': ['', [
        Validators.required,
        this.validateEmail
      ]],
    });
    this.loading = false;
  }

  private onCancel():boolean {
    TimerObservable.create().subscribe(() => {
      this.router.navigate(["apartments"]);
    });
    return false;
  }

  private onSave():boolean {
    this.loading = true;
    this.apartmentsService.add(this.form).then((result) => {
      if (result.success) {
        this.toastService.add('success', 'Saved!', 'The entry has been created successfully.')
      }
      else {
        this.toastService.add('danger', 'Error!', result.message);
      }
      TimerObservable.create().subscribe(() => {
        this.loading = false;
        this.router.navigate(["apartments"]);
      });
    });

    return false;
  }

  private validateEmail(c:FormControl) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return c.value === "" || EMAIL_REGEXP.test(c.value) ? null : {
      emailFormat: true
    };
  }

}
