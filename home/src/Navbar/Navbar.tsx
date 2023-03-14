import React, { useEffect, useState } from 'react';

// Router Dom
import { Link, useNavigate, useLocation } from "react-router-dom";

// Fusion
import { NavBar, Flex, IconButton, Box, IconAltusLogo, Tabs, Tab, theme } from 'fusion';

// Components
import SettingsAvatar from './Settings.Avatar';

// Services
import { currentTheme } from 'settings/SettingsService';

const NavbarComponent = () => {

    const navigate = useNavigate();
    const [appTheme, setAppTheme] = useState(currentTheme.value);
    const location = useLocation();
    const setTabValue = () => {
        const { pathname } = location;
        if (pathname.indexOf('/data') > -1) return 1;
        if (pathname.indexOf('/users') > -1) return 0;
        return -1;
    };
    
    useEffect(() => {
        currentTheme.subscribe((val) => {
            setAppTheme(val);
        });
    }, []);

    return (
        <NavBar
            mode={appTheme}
            sx={{
                backgroundColor: appTheme === 'dark' ? theme.colors.primary : theme.colors.grey2,
                color: appTheme === 'dark' ? theme.colors.text : theme.colors.modes.dark.text,
                justifyContent: 'space-between'
            }}
        >
            <Flex>
                <Box
                    sx={{
                        ml: 2
                    }}
                >
                    <Link to={'/'}>
                        <IconAltusLogo size="large" />
                    </Link>
                </Box>
                <Tabs
                    mode={appTheme}
                    value={setTabValue()}
                >
                    <Tab
                        label="Users"
                        onClick={() => navigate('/users')}
                        value={0}
                        sx={{
                            color: appTheme === 'dark' ? theme.colors.white : theme.colors.modes.dark.white,
                        }}
                    />
                    <Tab
                        label="Data"
                        onClick={() => navigate('/data')}
                        value={1}
                        sx={{
                            color: appTheme === 'dark' ? theme.colors.white : theme.colors.modes.dark.white,
                        }}
                    />
                </Tabs>
            </Flex>
            <Flex>
                <SettingsAvatar />
            </Flex>
        </NavBar>
    )
}

export default NavbarComponent;
