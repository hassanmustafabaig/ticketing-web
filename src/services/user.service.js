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

    return fetch(config.apiUrl + '/auth/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessTokenResponse.refresh_token) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken : user.accessTokenResponse.refresh_token })
        };

        return fetch(`${config.apiUrl}/auth/logout`, requestOptions)
            .then(handleResponse).
            then(res => {
                localStorage.removeItem('user');
            });
    }
}

function getRefreshToken() {

    if (localStorage.getItem('user') != null) {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user && user.accessTokenResponse.refresh_token) {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken : user.accessTokenResponse.refresh_token })
            };


            return fetch(`${config.apiUrl}/auth/get-refresh-token`, requestOptions)
                .then(handleResponse)
                .then(res => {
                    let updatedInfo = {accessTokenResponse : res, roles :  user.roles, refreshToken : user.refreshToken};
                    localStorage.setItem('user', JSON.stringify(updatedInfo));
                });
        }
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