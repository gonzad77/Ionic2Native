import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';


@Directive({
    selector: '[validateCountry][formControlName],[validateCountry][formControl],[validateCountry][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => CountryValidator), multi: true }
    ]
})

export class CountryValidator implements Validator {
    constructor( @Attribute('validateCountry') public validateCountry: string) {
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        let country = c.value;

        let phone = c.root.get(this.validateCountry);

        phone.updateValueAndValidity();


        return null;
    }
}
