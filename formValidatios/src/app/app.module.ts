import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormPage } from '../pages/form/form';
import { UserPage } from '../pages/user/user';

@NgModule({
  declarations: [
    MyApp,
    FormPage,
    UserPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FormPage,
    UserPage,
  ],
  providers: []
})
export class AppModule {}
