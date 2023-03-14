import React, { useState, useEffect } from 'react';
import { BehaviorSubject } from "rxjs";

const APP_THEME = 'app_theme';
const APP_TOKEN = 'app_token';

export const currentTheme = new BehaviorSubject(localStorage.getItem(APP_THEME));
export const token = new BehaviorSubject(localStorage.getItem(APP_TOKEN));

export const getCurrentTheme = () => {
    const [appTheme, setAppTheme] = useState(localStorage.getItem(APP_THEME) || 'light');

    useEffect(() => {
        setAppTheme(appTheme);
        currentTheme.subscribe((theme) => {
            localStorage.setItem(APP_THEME, theme as string);
            setAppTheme(theme as string);
        });
    }, []);

    return appTheme;
};

export const clearToken = () => localStorage.removeItem(APP_TOKEN);

const generateToken = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

export const defaultToken = () => {
    return localStorage.getItem(APP_TOKEN) ?? generateToken();
};

export const getAppToken = () => {
    const [appToken, setAppToken] = useState(defaultToken());

    useEffect(() => {
        setAppToken(appToken);
        token.subscribe((overRide) => {
            const defaultValue = defaultToken();
            localStorage.setItem(APP_TOKEN, defaultValue as string);
            setAppToken(defaultValue);
        });
    }, []);

    return appToken;
};

