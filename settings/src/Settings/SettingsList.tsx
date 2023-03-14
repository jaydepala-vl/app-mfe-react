import React, { useState } from 'react';

// Fusion
import { Grid, Box, MenuList, MenuItem, Button, Switch, TextField, ToastProvider, Toast } from 'fusion';

// Icons
import { IconRichSettings, IconSync, IconKey, IconBellOff, IconBell } from 'fusion';

// Services
import { currentTheme, getCurrentTheme } from './Settings.service';
import { token, getAppToken, defaultToken, clearToken } from './Settings.service';
// import useLongPress from 'home/useLongPress';

const SettingsList = () => {

	const [tokenToast, setTokenToast] = useState(false);
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

	return (
		<>
			<Grid columns={[1, 2]} sx={{ display: 'flex' }}>
				<Box p={2} pl={4}>
					<IconRichSettings style={{ top: '10px', position: 'relative', fontSize: 'xx-large' }} />
				</Box>
				<Box p={2}>
					<h1>
						Settings
					</h1>
				</Box>
			</Grid>
			<Box m={2} p={2}>
				<MenuList>
					<MenuItem>
						<Grid columns={[1, 1, 1, 2]} gap={2}>
							<Box>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									<h4>Theme</h4>
								</Grid>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									Switch to dark mode
								</Grid>
							</Box>
							<Box pt={5} sx={{ justifyContent: 'flex-end', display: 'grid' }}>
								<Switch label="Dark Mode" onChange={changeTheme} checked={appTheme === 'dark'} />
							</Box>
						</Grid>
					</MenuItem>
					<MenuItem>
						<Grid columns={[1, 1, 1, 2]} gap={2}>
							<Box>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									<h4>Sync</h4>
								</Grid>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									<p>
										Last sync done on 10<sup>th</sup> Feb, 2023
									</p>
								</Grid>
							</Box>
							<Box pt={5} sx={{ justifyContent: 'flex-end', display: 'grid' }}>
								<Button iconEnd={<IconSync />}>
									Start Sync
								</Button>
							</Box>
						</Grid>
					</MenuItem>
					<MenuItem>
						<Grid columns={[1, 1, 1, 2]} gap={2}>
							<Box>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									<h4>Select Language</h4>
								</Grid>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									<p>
										View the app in your preferred language
									</p>
								</Grid>
							</Box>
							<Box pt={5} sx={{ justifyContent: 'flex-end', display: 'grid' }}>
								<TextField
									options={options}
									defaultValue="Select a language"
									select
								/>
							</Box>
						</Grid>
					</MenuItem>
					<MenuItem>
						<Grid columns={[1, 1, 1, 2]} gap={2}>
							<Box>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									<h4>Generate Token</h4>
								</Grid>
								<Grid columns={[1]} sx={{ mb: 2 }}>
									<p>
										Generate a token to be used in other MFE
									</p>
									<Grid columns={[1, 1]} gap={2}>
									<Box>
										<Button variant="secondary" sx={{ width: '130px' }} onClick={() => setViewToken(!viewToken)} iconEnd={viewToken ? <IconBellOff /> : <IconBell />}>
											View Token
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
									Generate Token
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
									Save Changes
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