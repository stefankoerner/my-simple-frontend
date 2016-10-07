import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {ApartmentsService} from "../apartments.service";

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
    private apartmentsService:ApartmentsService
  ) {}

  private form:FormGroup;

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
    })
  }

  private onClickCancel():boolean {
    this.router.navigate(["../../"], {relativeTo: this.route});
    return false;
  }

  private onClickSave():boolean {
    this.apartmentsService.add(this.form);
    this.router.navigate(["../../"], {relativeTo: this.route});
    return false;
  }

  private validateEmail(c:FormControl) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return c.value === "" || EMAIL_REGEXP.test(c.value) ? null : {
      emailFormat: true
    };
  }

}
