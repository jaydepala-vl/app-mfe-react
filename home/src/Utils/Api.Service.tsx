import { defaultToken } from 'settings/SettingsService';

export const getAlbum = () => fetch(`https://jsonplaceholder.typicode.com/albums/1/photos`, {
    method: 'GET',
    headers: {
        'AUTH': defaultToken()
    }
}).then((res) => res.json());

export const getUsers = () => fetch(`https://jsonplaceholder.typicode.com/users`, {
    method: 'GET',
    headers: {
        'AUTH': defaultToken()
    }
}).then((res) => res.json());

export const getUserInfo = (id: string) => fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'GET',
    headers: {
        'AUTH': defaultToken()
    }
}).then((res) => res.json());

export const replaceAll = (target: string, search: string, replacement: string) => target.replace(new RegExp(search, 'g'), replacement);
