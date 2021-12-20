export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessTokenResponse.access_token) {
        return { 'Authorization': 'Bearer ' + user.accessTokenResponse.access_token };
    } else {
        return {};
    }
}