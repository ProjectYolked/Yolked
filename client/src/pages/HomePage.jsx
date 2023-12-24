import React, {useEffect, useState} from 'react';
import LogOutButton from '../components/LogOutButton.jsx';
import axios from "axios";
import User from "../models/User.js";


const HomePage = () => {

    const [user, setUser] = useState(new User({}));

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
        <div>
            <LogOutButton />
            <h1>Welcome to YOLKKED</h1>
            <p>{user.displayInfo()}</p>
        </div>
    );
}


export default HomePage;
