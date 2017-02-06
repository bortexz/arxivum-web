import { FormGroup } from '@angular/forms';

export function matchPasswords(passwordKey: string, repeatPasswordKey: string) {
  return (group: FormGroup) => {
    const passwordInput = group.controls[passwordKey];
    const repeatPasswordInput = group.controls[repeatPasswordKey];

    if (passwordInput.value !== repeatPasswordInput.value) {
      const error = { matchPassword: true };
      repeatPasswordInput.setErrors(
        Object.assign({}, repeatPasswordInput.errors || {}, error)
      );
    } else {
      return null;
    }
  };
}
