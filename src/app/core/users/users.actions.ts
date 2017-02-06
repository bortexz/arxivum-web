import { Injectable } from '@angular/core';

@Injectable()
export class UsersActions {
  static REGISTER = '[Users] Register new user';
  static REGISTER_SUCCESS = '[Users] Register new user success';
  static REGISTER_ERROR = '[Users] Register new user error';

  register ({name, email, password, token}) {
    return {
      type: UsersActions.REGISTER,
      payload: { name, email, password, token}
    };
  }

  registerSuccess () {
    return {
      type: UsersActions.REGISTER_SUCCESS
    };
  }

  registerError (error) {
    return {
      type: UsersActions.REGISTER_ERROR,
      payload: {
        error
      }
    };
  };
}
