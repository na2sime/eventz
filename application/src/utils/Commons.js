import axios from 'axios';

const API_URL = 'http://localhost:4000';
export const API_ROUTES = {
    SIGN_UP: `${API_URL}/api/user/signup`,
    SIGN_IN: `${API_URL}/api/auth/login`,
    USER: `${API_URL}/api/user`,
    EVENT: `${API_URL}/api/books/event`,
};

export function storeInLocalStorage(token, userId) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
}

export function getFromLocalStorage(item) {
    return localStorage.getItem(item);
}

export async function getAuthenticatedUser() {
    const defaultReturnObject = { authenticated: false, user: null };
    try {
        const token = getFromLocalStorage('token');
        const userId = getFromLocalStorage('userId');
        if (!token) {
            return defaultReturnObject;
        }
        return { authenticated: true, user: { userId, token } };
    } catch (err) {
        console.error('getAuthenticatedUser, Something Went Wrong', err);
        return defaultReturnObject;
    }
}