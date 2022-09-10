import { Injectable } from "@angular/core";
import { ValidationErrors, AbstractControl, Validators, ValidatorFn } from "@angular/forms";

@Injectable({ providedIn: "root" })
export class ValidatorService {
  date(controls: AbstractControl): any {
    const date = new Date(controls.value).toLocaleDateString();
    const regExp = new RegExp(/^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/);

    if (controls.value && controls.value?.length > 0 && !regExp.test(date)) {
      return { date: true };
    }
  }

  first_name(controls: AbstractControl): any {
    const regExp = new RegExp(/^[a-zA-Z_.-]+@[a-zA-Z_]+?\.[a-zA-Z]+$/);

    if (controls.value && !regExp.test(controls.value) && controls.value.length > 0) {
      return { first_name: true };
    }
  }

  last_name(controls: AbstractControl): any {
    const regExp = new RegExp(/^[a-zA-Z_.-]+@[a-zA-Z_]+?\.[a-zA-Z]+$/);

    if (controls.value && !regExp.test(controls.value) && controls.value.length > 0) {
      return { last_name: true };
    }
  }

  message(controls: AbstractControl): any {
    const regExp = new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

    if (controls.value && !regExp.test(controls.value) && controls.value.length > 0) {
      return { message: true };
    }
  }

  email(controls: AbstractControl): any {
    const regExp = new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

    if (controls.value && !regExp.test(controls.value) && controls.value?.length > 0) {
      return { email: true };
    }
  }

  letters(controls: AbstractControl): any {
    const regExp = new RegExp(/^[a-zA-Z0-9_\,\-.\s]+$/);

    if (controls.value && !regExp.test(controls.value) && controls.value?.length > 0) {
      return { letters: true };
    }
  }

  number(controls: AbstractControl): any {
    const regExp = new RegExp(/^(\d*\.)?\d+$/);

    if (controls.value && !regExp.test(controls.value) && controls.value?.length > 0) {
      return { number: true };
    }
  }

  integer(controls: AbstractControl): any {
    const regExp = new RegExp(/^-?\d*\.?\d+$/);
    if (controls.value && !regExp.test(controls.value) && controls.value?.length > 0) {
      return { integer: true };
    }
  }

  phoneNumber(): ValidatorFn[] {
    return [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(8)];
  }

  numberAndLetters(controls: AbstractControl): any {
    const regExp = new RegExp(/^[a-zA-Z0-9\s]+(?:[\w]*[a-zA-Z0-9\s]+)*$/);

    if (controls.value && !regExp.test(controls.value) && controls.value?.length > 0) {
      return { numberAndLetters: true };
    }
  }

  address(controls: AbstractControl): any {
    const regExp = new RegExp(/^[a-zA-Z0-9-#_\-.,)(@}{\s]+$/);

    if (controls.value && !regExp.test(controls.value) && controls.value?.length > 0) {
      return { address: true };
    }
  }

  password(controls: AbstractControl): any {
    const regExp = new RegExp(/((?=.*\d)(?=.*[A-Z])(?=.*\W))/);

    if ((controls.value && !regExp.test(controls.value)) || controls.value?.length < 8) {
      return { password: true };
    }
  }

  mobile(controls: AbstractControl): any {
    const regExp = new RegExp(/^[0-9]*$/);
    if ((controls.value && !regExp.test(controls.value)) || controls.value?.length < 11) {
      return { mobile: true };
    }
  }

  phone(controls: AbstractControl): any {
    const regExp = new RegExp(/^[0-9]*$/);
    if ((controls.value && !regExp.test(controls.value)) || controls.value?.length < 8) {
      return { phone: true };
    }
  }

  matchPassword(group: AbstractControl): ValidationErrors | null {
    let password = group.get("password");
    let confirmPassword = group.get("confirmPassword");
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordNotMatch: true });
    } else {
      if (!confirmPassword?.value) {
        confirmPassword?.setErrors({ required: true });
      } else {
        confirmPassword?.setErrors(null);
      }
    }
    return null;
  }
}
