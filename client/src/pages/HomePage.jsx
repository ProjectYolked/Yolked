import React from 'react';
import UserFetcher from "../components/UserFetcher.jsx";
import LogOutButton from '../components/LogOutButton.jsx';

const HomePage = () => {
    return (
        <div>
            <LogOutButton />
            <h1>Welcome to YOLKKED</h1>
            <UserFetcher />
        </div>
    );
}


export default HomePage;
