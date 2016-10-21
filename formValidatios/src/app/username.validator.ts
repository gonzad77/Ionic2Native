import {FormGroup} from '@angular/forms';

export class UsernameValidator {

  static validUsername(fg: FormGroup){

    return new Promise(resolve => {

      setTimeout(() => {
        if(fg.value.toLowerCase() === "abc123" || fg.value.toLowerCase() === "123abc"){
          console.log("true");
          resolve(true);

        } else {
          resolve(false);
        }
      }, 2000);

    });
  }
}
