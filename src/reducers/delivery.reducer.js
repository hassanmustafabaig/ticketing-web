import { deliveryConstants } from '../constants';

export function delivery(state = {}, action) {
  switch (action.type) {
    case deliveryConstants.GET_ALL_REQUEST:
      return {
        loading: true
      };
    case deliveryConstants.GET_ALL_SUCCESS:
      return {
        items: action.deliveries
      };
    case deliveryConstants.GET_ALL_FAILURE:
      return { 
        error: action.error
      };
    case deliveryConstants.ADD_REQUEST:
      return { adding: true };
    case deliveryConstants.ADD_SUCCESS:
      return {};
    case deliveryConstants.ADD_FAILURE:
      return {};    
    default:
      return state
  }
}