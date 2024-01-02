import axios from 'axios';
import {useEffect, useState} from "react";

const API_URL = 'http://localhost:4000';
export const API_ROUTES = {
    SIGN_UP: `${API_URL}/api/user/signup`,
    SIGN_IN: `${API_URL}/api/auth/login`,
    IS_CONNECTED: `${API_URL}/api/auth/isConnected`,
    USER: `${API_URL}/api/user`,
    EVENT: `${API_URL}/api/books/event`,
};

export function storeInLocalStorage(token: string, userId: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
}

export function getFromLocalStorage(item: string): string | null {
    return localStorage.getItem(item);
}

export async function getAuthenticatedUser(): Promise<{ authenticated: boolean; user: any }> {
    const defaultReturnObject = {authenticated: false, user: null};
    try {
        const token = getFromLocalStorage('token');
        const userId = getFromLocalStorage('userId');
        if (!token) {
            return defaultReturnObject;
        }
        return {authenticated: true, user: {userId, token}};
    } catch (err) {
        console.error('getAuthenticatedUser, Something Went Wrong', err);
        return defaultReturnObject;
    }
}

export function useUser(): { connectedUser: any; auth: boolean; userLoading: boolean } {
    const [connectedUser, setConnectedUser] = useState(null);
    const [auth, setAuth] = useState(false);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        async function getUserDetails() {
            const {authenticated, user} = await getAuthenticatedUser();
            setConnectedUser(user);
            setAuth(authenticated);
            setUserLoading(false);
        }

        getUserDetails();
    }, []);

    return {connectedUser, auth, userLoading};
}

export async function isConnected(): Promise<boolean> {
    const token = getFromLocalStorage('token');
    try {
        const response = await axios({
            method: 'get',
            url: API_ROUTES.IS_CONNECTED,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            return false;
        } else {
            return true;
        }
    } catch (err: any) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        return false;
    }
}

export async function getUser(id: string | null): Promise<any> {
    if (!id) {
        return null;
    }
    try {
        const response = await axios.get(API_ROUTES.USER + `/${id}`);
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export const hideTabBar = (): void => {
    const tabBar = document.getElementById('app-tab-bar');
    if (tabBar !== null) {
        tabBar.style.display = 'none';
    }
}

export const showTabBar = (): void => {
    const tabBar = document.getElementById('app-tab-bar');
    if (tabBar !== null) {
        tabBar.style.display = 'flex';
    }
};