import React, { useEffect, useState } from 'react';

// Fusion
import { Grid, Box } from 'fusion';

// Icons
import { IconRichAvatar, theme, Spinner, Text } from 'fusion';

// Router
import { useParams, useNavigate, Link } from 'react-router-dom';

// Services
import { getUserInfo, replaceAll } from 'home/ApiService';

const UserProfile = () => {

    const [user, setUser] = useState(null);
    const params = useParams();
    const navigate = useNavigate();
    const { userid } = params;

    useEffect(() => {
        const id = userid?.split('-')[userid?.split('-').length - 1];
        if (!id) {
            return navigate('/users');
        }
        getUserInfo(id).then((res: any) => {
            if (!res || res === null || Object.keys(res).length === 0) {
                return navigate('/users');
            }
            setUser(res);
        }).catch((err) => {
            navigate('/users');
        })
    }, []);

    return (
        <Box p={2}>
            {
                !user && (
                    <Spinner sx={{ height: 500 }} />
                )
            }
            {
                user !== null && (
                    <>
                        <Grid columns={[1]} sx={{ mb: 2 }}>
                            <ul style={{listStyle: 'none', display: 'inline-table'}}>
                                <li style={{display: 'inline-grid', padding: '10px', width: 'auto'}}>
                                    <Link to={'/users'}>
                                        <Text color={'primary'}>
                                            Users
                                        </Text>
                                    </Link>
                                </li>
                                <li style={{display: 'inline-grid', padding: '10px', width: 'auto'}}>
                                    <Text color={'primary'}>
                                        /
                                    </Text>
                                </li>
                                <li style={{display: 'inline-grid', padding: '10px', width: 'auto'}}>
                                    <Link to={`/users/${replaceAll(`${user.name} ${user.id}`, ' ', '-').toLowerCase()}`} className="">
                                        <Text color={'grey4'}>
                                            { user.name }
                                        </Text>
                                    </Link>
                                </li>
                            </ul>
                        </Grid>
                        <Grid columns={[1]} sx={{ mb: 2 }}>
                            <Box backgroundColor={theme.colors['accent-7'][50]} p={4}>
                                <Grid columns={[1, 2]} gap={2}>
                                    <Box p={3}>
                                        <IconRichAvatar />
                                    </Box>
                                    <Box p={2}>
                                        <h2>
                                            { user.name }
                                        </h2>
                                    </Box>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid columns={[1, 1, 1, 2, 4]} gap={2} sx={{ mb: 2 }}>

                        </Grid>
                    </>
                )
            }
        </Box>
    );
}

export default UserProfile