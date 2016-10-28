import libphonenumber from 'google-libphonenumber';
import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';


@Directive({
    selector: '[validatePhone][formControlName],[validatePhone][formControl],[validatePhone][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => PhoneValidator), multi: true }
    ]
})

export class PhoneValidator implements Validator {
    constructor( @Attribute('validatePhone') public validatePhone: string) {
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        let phone = c.value;

        // control vlaue
        let country = c.root.get(this.validatePhone);

        try{
              const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
              let phoneNumber = "" + phone + "",
                  region = country.value.iso,
                  number = phoneUtil.parse(phoneNumber, region),
                  isValidNumber = phoneUtil.isValidNumber(number);
                  if(!isValidNumber){
                    return {validatePhone: false}
                  }
        }catch(e){
              console.log(e);
              return {validatePhone: false};
            }

        return null
    }
}
