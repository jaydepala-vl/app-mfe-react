import React from 'react';

// Router Dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import NavbarComponent from './Navbar/Navbar';

// Remote Components
// import SettingsList from 'settings/SettingsList';
// import UsersList from 'users/UsersList';
// import DataList from 'data/DataList';
const SettingsList = React.lazy(() => import('settings/SettingsList') as any);
const UsersList = React.lazy(() => import('users/UsersList') as any);
const UserProfile = React.lazy(() => import('users/UserProfile') as any);
const DataList = React.lazy(() => import('data/DataList') as any);

const MainLayout = () => {
    return (
        <Router>
            <NavbarComponent />
            <Routes>
                <Route exact path="/" element={<React.Suspense fallback={<div>Loading...</div>}><SettingsList /></React.Suspense>} />
                <Route path="/index.html" element={<React.Suspense fallback={<div>Loading...</div>}><UsersList /></React.Suspense>} />
                <Route path="/settings" element={<React.Suspense fallback={<div>Loading...</div>}><SettingsList /></React.Suspense>} />
                <Route path="/users" element={<React.Suspense fallback={<div>Loading...</div>}><UsersList /></React.Suspense>} />
                <Route path="/users/:userid" element={<React.Suspense fallback={<div>Loading...</div>}><UserProfile /></React.Suspense>} />
                <Route path="/data" element={<React.Suspense fallback={<div>Loading...</div>}><DataList /></React.Suspense>} />
            </Routes>
        </Router>
    );
}
export default MainLayout;
