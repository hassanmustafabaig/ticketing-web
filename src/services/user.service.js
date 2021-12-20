import config from '../../src/config/config';
import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    getRefreshToken
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(config.apiUrl + '/auth/get-token', requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getRefreshToken() {
   
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessTokenResponse.access_token) {        

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"refreshToken" : user.accessTokenResponse.refresh_token}) 
    };


    return fetch(`${config.apiUrl}/auth/get-refresh-token`, requestOptions)
        .then(handleResponse).
        then(res => {
            user.accessTokenResponse.access_token = res;
            localStorage.setItem('user', user);
        });
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();                
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}