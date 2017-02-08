import { InvitationsActions } from './invitations.actions';
import { IInvitation } from './invitations.interfaces';

export interface InvitationsListState {
  invitations: IInvitation[];
}

const initialState: InvitationsListState = {
  invitations: null
};

export function invitationsReducer (state = initialState, action) {
  switch (action.type) {
    case InvitationsActions.GET_INVITATIONS: {
      return {
        invitations: null
      };
    }
    case InvitationsActions.GET_INVITATIONS_SUCCESS: {
      return {
        invitations: action.payload.invitations
      };
    }
    case InvitationsActions.GET_INVITATIONS_ERROR: {
      return {
        invitations: null
      };
    }
  }
  return state;
}
