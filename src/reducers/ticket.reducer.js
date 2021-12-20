import { ticketConstants } from '../constants';

export function ticket(state = {}, action) {
  switch (action.type) {
    case ticketConstants.GET_ALL_REQUEST:
      return {
        loading: true
      };
    case ticketConstants.GET_ALL_SUCCESS:
      return {
        items: action.tickets
      };
    case ticketConstants.GET_ALL_FAILURE:
      return { 
        error: action.error
      };    
    default:
      return state
  }
}