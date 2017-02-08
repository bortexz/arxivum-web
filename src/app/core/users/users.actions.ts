import { Injectable } from '@angular/core';

@Injectable()
export class UsersActions {

  // Register actions
  static REGISTER = '[Users] Register new user';
  static REGISTER_SUCCESS = '[Users] Register new user success';
  static REGISTER_ERROR = '[Users] Register new user error';

  // Admin users actions
  static GET_USERS = '[Users] Get all users';
  static GET_USERS_SUCCESS = '[Users] Get all users success';
  static GET_USERS_ERROR = '[Users] Get all users error';

  // Register
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

  // Admin actions
  getUsers () {
    return {
      type: UsersActions.GET_USERS
    };
  }

  getUsersSuccess (users) {
    return {
      type: UsersActions.GET_USERS_SUCCESS,
      payload: { users }
    };
  }

  getUsersError (error) {
    return {
      type: UsersActions.GET_USERS_ERROR,
      payload: { error }
    };
  }
}
