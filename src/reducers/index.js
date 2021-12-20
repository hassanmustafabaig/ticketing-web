import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { delivery } from './delivery.reducer';
import { ticket } from './ticket.reducer';

const rootReducer = combineReducers({
  authentication,  
  alert,
  ticket,
  delivery
});

export default rootReducer;