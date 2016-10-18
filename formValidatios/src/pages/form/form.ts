import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  sampleForm: any;

  constructor(public navCtrl: NavController, public fbld: FormBuilder) {

  }

  ionViewDidLoad() {
    this.sampleForm = this.fbld.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['male', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      agree: ['false', Validators.required]
    });
  }

}
