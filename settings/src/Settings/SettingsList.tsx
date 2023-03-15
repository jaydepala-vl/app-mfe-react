import React, { useState } from 'react';

// Fusion
import { Grid, Box, MenuList, MenuItem, Button, Switch, TextField, ToastProvider, Toast } from 'fusion';

// Icons
import { IconRichSettings, IconSync, IconKey, IconBellOff, IconBell } from 'fusion';

// Services
import { currentTheme, getCurrentTheme } from './Settings.service';
import { token, getAppToken, defaultToken, clearToken } from './Settings.service';
// import useLongPress from 'home/useLongPress';

// i18n
import { useTranslation } from 'react-i18next';
import i18n from 'home/i18n';

// css
import './Settings.css';

const SettingsList = () => {

    const { t } = useTranslation();
	const [tokenToast, setTokenToast] = useState(false);
	const [sync, setSync] = useState(false);
	const [language, setLanguage] = useState('en');
	const [viewToken, setViewToken] = useState(false);
	const appTheme = getCurrentTheme();
	const appToken = getAppToken();

	const changeTheme = (eve: React.ChangeEvent<HTMLInputElement>) => {
		currentTheme.next(eve.target.checked ? 'dark' : 'light');
	};
	const options = [
		{ label: 'English', value: 'en' },
		{ label: 'French', value: 'fr' },
		{ label: 'German', value: 'gb' },
	];

	const generateToken = () => {
		clearToken();
		token.next(true as any);
		setTokenToast(true);
	};

    const changeLanguage = (lang: string) => {
		setLanguage(lang);
        i18n.changeLanguage(lang);
    };

	const startSync = () => {
		setSync(true);
		setTimeout(() => {
			setSync(false);
		}, 3000);
	};

	return (
		<>
			<Grid columns={[1, 2]} sx={{ display: 'flex' }}>
				<Box p={2} pl={4}>
					<IconRichSettings style={{ top: '10px', position: 'relative', fontSize: 'xx-large' }} />
				</Box>
				<Box p={2}>
					<h1>
						{t('settings')}
					</h1>
				</Box>
			</Grid>
			<Box m={2} p={2}>
				<MenuList>
					<MenuItem>
						<Grid columns={[1, 1, 1, 2]} gap={2}>
							<Box>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									<h4>{ t('theme') }</h4>
								</Grid>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									{ t('themeText') }
								</Grid>
							</Box>
							<Box pt={5} sx={{ justifyContent: 'flex-end', display: 'grid' }}>
								<Switch label={t('darkMode')} onChange={changeTheme} checked={appTheme === 'dark'} />
							</Box>
						</Grid>
					</MenuItem>
					<MenuItem>
						<Grid columns={[1, 1, 1, 2]} gap={2}>
							<Box>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									<h4>{ t('sync') }</h4>
								</Grid>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									<p>
										{ t('syncText') }
									</p>
								</Grid>
							</Box>
							<Box pt={5} sx={{ justifyContent: 'flex-end', display: 'grid' }}>
								<Button iconEnd={<IconSync className={ sync ? 'rotating' : 'stop' } />} onClick={startSync}>
									{ t('startSync') }
								</Button>
							</Box>
						</Grid>
					</MenuItem>
					<MenuItem>
						<Grid columns={[1, 1, 1, 2]} gap={2}>
							<Box>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									<h4>{ t('lang') }</h4>
								</Grid>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									<p>
										{ t('langText') }
									</p>
								</Grid>
							</Box>
							<Box pt={5} sx={{ justifyContent: 'flex-end', display: 'grid' }}>
								<TextField
									options={options}
									defaultValue={ t('selectLanguage') }
									select
									value={language}
									onSelectChange={changeLanguage}
								/>
							</Box>
						</Grid>
					</MenuItem>
					<MenuItem>
						<Grid columns={[1, 1, 1, 2]} gap={2}>
							<Box>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									<h4>{ t('token') }</h4>
								</Grid>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									<p>
										{ t('tokenText') }
									</p>
									<Grid columns={[1, 1]} gap={2}>
									<Box>
										<Button variant="secondary" onClick={() => setViewToken(!viewToken)} iconEnd={viewToken ? <IconBellOff /> : <IconBell />}>
											{ t('viewToken') }
										</Button>
									</Box>
									<Box>
										{ viewToken && (
											<p>
												{ defaultToken() }
											</p>
										)}
										{ !viewToken && (
											<p>
												xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
											</p>
										)}
									</Box>
									</Grid>
								</Grid>
							</Box>
							<Box pt={5} sx={{ justifyContent: 'flex-end', display: 'grid' }}>
								<Button iconEnd={<IconKey />} onClick={() => generateToken()}>
									{ t('token') }
								</Button>
							</Box>
						</Grid>
					</MenuItem>
					<MenuItem style={{ backgroundColor: 'unset', cursor: 'default' }}>
						<Grid columns={[1, 1, 1, 2]} gap={2}>
							<Box>
								<Grid columns={[1]} sx={{ mb: 2 }}>
								</Grid>
								<Grid columns={[1]} sx={{ mb: 2 }}>
								</Grid>
							</Box>
							<Box pt={5} sx={{ justifyContent: 'flex-end', display: 'grid' }}>
								<Button variant="primary">
									{ t('saveChanges') }
								</Button>
							</Box>
						</Grid>
					</MenuItem>
				</MenuList>
			</Box>
			<ToastProvider>
				<Toast open={tokenToast} onClose={() => setTokenToast(false)} autoHideDuration={5000}>
					Current token: { appToken }
				</Toast>
			</ToastProvider>
		</>
	)
}

export default SettingsList;