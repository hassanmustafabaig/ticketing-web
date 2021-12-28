import { deliveryConstants } from '../constants';
import { deliveryService } from '../services';
import { alertActions } from '.';
import { history } from '../helpers';

export const deliveryActions = {
    getAll,
    addDelivery
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

function addDelivery(delivery) {
    return dispatch => {
        dispatch(request(delivery));

        deliveryService.addDelivery(delivery)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/delivery');
                    dispatch(alertActions.success('Delivery added successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(delivery) { return { type: deliveryConstants.ADD_REQUEST, delivery } }
    function success(delivery) { return { type: deliveryConstants.ADD_SUCCESS, delivery } }
    function failure(error) { return { type: deliveryConstants.ADD_FAILURE, error } }
}