import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { FormPage } from '../pages/form/form';
import { UserPage } from '../pages/user/user';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})

export class MyApp {

  // @ViewChild(Nav) nav: Nav;

  rootPage: any = FormPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
