import React, { useState, useEffect } from 'react';
import { defaultToken } from 'settings/SettingsService';

// API
import { getAlbum } from 'home/ApiService';

export const fetchAlbum = () => {

    const [album, setAlbum] = useState([]);

    useEffect(() => {

        getAlbum()
        .then((res) => {
            setAlbum(res);
            return res;
        })
        .catch(console.error);

    }, []);

    return album;
};
