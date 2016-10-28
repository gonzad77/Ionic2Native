import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { UsernameValidator } from '../../validators/username.validator';
import { EqualValidator } from '../../validators/password.validator';
import { UserPage } from '../user/user';
import { Country } from './country.class'


import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-form',
  templateUrl: 'form.html'
})

export class FormPage {

  sampleForm: FormGroup;
  termsAgree: boolean;
  countries: Country[];

  constructor(public navCtrl: NavController, public fbld: FormBuilder) {
  }

  ionViewDidLoad() {
    this.countries = [new Country('UY', 'Uruguay', '+598'), new Country('US', 'United States', '+1')];
    this.termsAgree = true;
    this.sampleForm = this.fbld.group({
      username: ['', Validators.compose([UsernameValidator.validUsername, Validators.maxLength(25), Validators.minLength(5), Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'), Validators.required])],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      country: [this.countries[0], Validators.required],
      phone: ['', Validators.compose([Validators.pattern('^\\d+$'), Validators.required])],
      gender: ['male', Validators.required],
      password: ['', Validators.compose([Validators.minLength(5), Validators.required])],
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
      // clear previous error message
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
    'phone': [],
    'password': [],
    'confirmPassword': []
  };
  validationMessages = {
    'username': {
      'required':      'Username is required.',
      'minlength':     'Username must be at least 5 characters long.',
      'maxlength':     'Username cannot be more than 25 characters long.',
      'pattern':       'Your username must contain only numbers and letters.',
      'validUsername': 'Your username has already been taken.'
    },
    'name': {
      'required':      'Name is required.'
    },
    'surname': {
      'required':      'Surname is required'
    },
    'email': {
      'required':      'Email is required',
      'pattern':       'Enter a valid email.'
    },
    'phone': {
      'required':      'Phone is required',
      'pattern':       'Enter only numbers',
      'validatePhone': 'Phone incorrect for the country selected'
    },
    'password': {
      'required':      'Password is required',
      'minlength':     'Password must be at least 5 characters long.',
      'pattern':       'Your password must contain one lower and uppercase letter, and one non-alpha character.'
    },
    'confirmPassword':{
      'required':      'Confirm password is required',
      'minlength':     'Confirm password must be at least 5 characters long.',
      'pattern':       'Your password must contain one lower and uppercase letter, and one non-alpha character.',
      'validateEqual': 'Password mismatch'
    }
  };

  onSubmit(values){
    if(values.agree){
      this.termsAgree = true;
      this.navCtrl.push(UserPage);
    }
    else{
      this.termsAgree = false;
    }
  }


}
