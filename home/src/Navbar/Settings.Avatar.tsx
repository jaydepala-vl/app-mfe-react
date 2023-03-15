import React from 'react';

// Router Dom
import { Link, useNavigate } from "react-router-dom";

// Fusion
import { Flex, Box, Button, IconRichAvatar, ClickAwayListener, Popover, Divider, MenuItem, MenuList, theme, Text, ToastProvider, Toast } from 'fusion';

// Fusion Icons
import { IconBriefcase, IconSettings, IconLogOut } from 'fusion';

// i18n
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const SettingsAvatar = () => {

    const { t } = useTranslation();
    const [buttonEl, setButtonEl] = React.useState<HTMLButtonElement | null>(null);
    const [signOut, setSignOut] = React.useState(false);
    const navigate = useNavigate();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };
    
    return (
        <ClickAwayListener
            onClickAway={() => {
                setButtonEl(null);
            }}
        >
            <Box role="presentation">
                <IconRichAvatar
                    color="accent-5"
                    onClick={e => setButtonEl(!buttonEl ? e.currentTarget : null)}
                    style={{
                        cursor: 'pointer'
                    }}
                    sx={{
                        ml: 1
                    }}
                />
                <Popover placement="right" open={!!buttonEl} sx={{ mt: 4 }} anchorEl={buttonEl}>
                    <MenuList sx={{ width: 200, boxShadow: theme.shadows.depth5 }}>
                        <MenuItem>
                            <Button onClick={() => changeLanguage('fr')}>
                                <Flex sx={{ justifyContent: 'space-between', width: '100%' }}>
                                    <Text>{t('myAccount')}</Text>
                                    <IconBriefcase size="small" />
                                </Flex>
                            </Button>
                        </MenuItem>
                        <MenuItem onClick={() => navigate('settings')}>
                            <Flex sx={{ justifyContent: 'space-between' }}>
                                <Text>{t('settings')}</Text>
                                <IconSettings size="small" />
                            </Flex>
                        </MenuItem>
                        {/* <Text variant="small" weight="semibold" color="textSecondary" sx={{ pt: 2, pb: 1, px: 3 }}>
                            My Account
                        </Text>
                        <MenuItem disabled>Disabled</MenuItem>
                        <MenuItem disabled selected>
                            Disabled Selected
                        </MenuItem>
                        <MenuItem selected>Selected</MenuItem> */}
                        <Divider />
                        <MenuItem onClick={() => setSignOut(true)}>
                            <Flex sx={{ justifyContent: 'space-between' }}>
                                <Text>{t('signOut')}</Text>
                                <IconLogOut size="small" />
                            </Flex>
                        </MenuItem>
                    </MenuList>
                </Popover>
			<ToastProvider>
				<Toast open={signOut} onClose={() => setSignOut(false)} autoHideDuration={5000}>
					You can never leave!
				</Toast>
			</ToastProvider>
            </Box>
        </ClickAwayListener>
    )
}
export default SettingsAvatar;
