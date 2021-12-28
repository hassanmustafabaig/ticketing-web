import config from '../config/config';
import { authHeader } from '../helpers';

export const deliveryService = {
    getAll,
    addDelivery
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/delivery/get-all',requestOptions).then(handleResponse);
}

function addDelivery(delivery) {
    const requestOptions = {
        method: 'POST',
        headers: {  'Authorization' : authHeader().Authorization ,'Content-Type': 'application/json' },
        body: JSON.stringify(delivery)
    };

    return fetch(`${config.apiUrl}/delivery/add`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                // auto logout if 401 or 403 response returned from api
                logout();                
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}