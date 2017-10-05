import { Action } from '@ngrx/store';
// import { Injectable } from '@angular/core';

// @Injectable()
// export class InvitationsActions {
//   static GET_INVITATIONS = '[Invitations] Get invitations';
//   static GET_INVITATIONS_SUCCESS = '[Invitations] Get invitations success';
//   static GET_INVITATIONS_ERROR = '[Invitations] Get invitations error';

//   static CREATE_INVITATION = '[Invitations] Create invitation';
//   static CREATE_INVITATION_SUCCESS = '[Invitations] Create invitation success';
//   static CREATE_INVITATION_ERROR = '[Invitations] Create invitation error';

//   getInvitations () {
//     return {
//       type: InvitationsActions.GET_INVITATIONS
//     };
//   }

//   getInvitationsSuccess (invitations) {
//     return {
//       type: InvitationsActions.GET_INVITATIONS_SUCCESS,
//       payload: { invitations }
//     };
//   }

//   getInvitationsError (error) {
//     return {
//       type: InvitationsActions.GET_INVITATIONS_ERROR,
//       payload: { error }
//     };
//   }

//   // create
//   createInvitation (email) {
//     return {
//       type: InvitationsActions.CREATE_INVITATION,
//       payload: { email }
//     };
//   }

//   createInvitationSuccess (invitation) {
//     return {
//       type: InvitationsActions.CREATE_INVITATION_SUCCESS,
//       payload: { invitation }
//     };
//   }

//   createInvitationError (error) {
//     return {
//       type: InvitationsActions.CREATE_INVITATION_ERROR,
//       payload: { error }
//     };
//   }
// }
export const RELOAD_LIST = '[Invitations] Reload list'
export class ReloadList implements Action {
  readonly type = RELOAD_LIST;
}

export const UPDATE_INVITATIONS_LIST = '[Invitations] Update invitations list';
export class UpdateInvitationsList implements Action {
  readonly type = UPDATE_INVITATIONS_LIST;
  constructor (public invitations) {};
}

