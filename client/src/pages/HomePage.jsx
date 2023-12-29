import React, { useEffect, useState } from 'react';
import LogOutButton from '../components/LogOutButton.jsx';
import axios from "axios";
import User from "../models/User.js";
import HomepageSidebar from "../components/nav/HomepageSidebar.jsx";
import { Box } from "@mui/material";
import useIsMobile from '../utils/useIsMobile.jsx';
import MobileNavBar from '../components/nav/MobileNavBar.jsx';


const HomePage = () => {

    const [user, setUser] = useState(new User({}));

    const isMobile = useIsMobile();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                // Convert the response data to a User instance
                const userData = new User(response.data);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <Box display="flex">
            {!isMobile && <HomepageSidebar />}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <LogOutButton />
                <h1>Welcome to YOLKKED</h1>
                <p>{user.displayInfo()}</p>
            </Box>
            {isMobile && <MobileNavBar />}
        </Box>
    );
}


export default HomePage;
