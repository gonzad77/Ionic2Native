import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  sampleForm: FormGroup;

  constructor(public navCtrl: NavController, public fbld: FormBuilder) {
  }

  ionViewDidLoad() {
    this.sampleForm = this.fbld.group({
      username: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(5), Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'), Validators.required])],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['male', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      agree: [false, Validators.required]
    });

    this.sampleForm.valueChanges
      .debounceTime(400)
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.sampleForm) { return; }
    const form = this.sampleForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = [];
      this.sampleForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  formErrors = {
    'username': [],
    'name': [],
    'surname': [],
    'email': [],
    'password': [],
    'confirmPassword': []
  };
  validationMessages = {
    'username': {
      'required':      'Username is required.',
      'minlength':     'Username must be at least 5 characters long.',
      'maxlength':     'Username cannot be more than 25 characters long.',
      'pattern':       'Your username must contain only numbers and letters.'
    },
    'name': {
      'required':      'Name is required.'
    },
    'surname': {
      'required':      'Surname is required'
    },
    'email': {
      'required':      'Email is required'
    },
    'password':{
      'required':      'Password is required'
    },
    'confirmPassword':{
      'required':      'Confirm password is required'
    }
  };

  onSubmit(values){
    // if(values.agree){
    //   console.log(values);
    // }
    // else{
    //   console.log("error");
    // }
    console.log(values);
  }


}
