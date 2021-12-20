import { ticketConstants } from '../constants';
import { ticketService } from '../services';
import { alertActions } from '.';
import { history } from '../helpers';

export const ticketActions = {
    getAll
};

function getAll() {
    return dispatch => {
        dispatch(request());
        ticketService.getAll()
            .then(
                tickets => dispatch(success(tickets)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: ticketConstants.GET_ALL_REQUEST } }
    function success(tickets) { return { type: ticketConstants.GET_ALL_SUCCESS, tickets } }
    function failure(error) { return { type: ticketConstants.GET_ALL_FAILURE, error } }
}