import { deliveryConstants } from '../constants';
import { deliveryService } from '../services';
import { alertActions } from '.';
import { history } from '../helpers';

export const deliveryActions = {
    getAll
};

function getAll() {
    return dispatch => {
        dispatch(request());

        deliveryService.getAll()
            .then(
                deliveries => dispatch(success(deliveries)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: deliveryConstants.GET_ALL_REQUEST } }
    function success(deliveries) { return { type: deliveryConstants.GET_ALL_SUCCESS, deliveries } }
    function failure(error) { return { type: deliveryConstants.GET_ALL_FAILURE, error } }
}