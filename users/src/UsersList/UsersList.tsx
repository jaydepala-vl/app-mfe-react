import React, { useState, useEffect } from 'react';

// Router
import { Link } from 'react-router-dom';

// Fusion
import { Grid, Box, Flex, theme, IconRichAvatar, Spinner } from 'fusion';

// Services
import { getUsers, replaceAll } from 'home/ApiService';

const UsersList = () => {

	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers().then(setUsers)
		.catch(console.error);
	}, []);

	return (
		<Box>
			{
				(!users || users.length === 0) && (
                    <Spinner sx={{ height: 500 }} />
				)
			}
			<Grid columns={[1, 1, 1, 2, 3]} gap={2} sx={{ mb: 2 }}>
				{
					users.map((user: any) => (

						<Box key={`user-${user.id}`} backgroundColor={theme.colors['accent-1'][50]}>
							<Link to={replaceAll(`${user.name} ${user.id}`, ' ', '-').toLowerCase()}>
								<Box sx={{ display: 'flex' }}>
									<IconRichAvatar />
									<h3>
										{ user.name }
									</h3>
								</Box>
							</Link>

							<Grid columns={[1, 1, 1, 2]} gap={2}>
								<Box backgroundColor={theme.colors['accent-8'][50]}>
									Email:
								</Box>
								<Box backgroundColor={theme.colors['accent-8'][50]}>
									<Link to={`mailto:${user.email}`}>
										{ user.email }
									</Link>
								</Box>
							</Grid>
							<Grid columns={[1, 1, 1, 2]} gap={2}>
								<Box backgroundColor={theme.colors['accent-8'][50]}>
									Mobile:
								</Box>
								<Box backgroundColor={theme.colors['accent-8'][50]}>
									<Link to={`tel:${user.phone}`}>
										{ user.phone }
									</Link>
								</Box>
							</Grid>
						</Box>
					))
				}
			</Grid>
		</Box>
	);
}

export default UsersList