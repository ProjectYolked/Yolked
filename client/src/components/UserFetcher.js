import React, { useState } from 'react';
import User from '../models/User'

const UserFetcher = () => {
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchUser = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:5000/api/user/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUser(new User(data));
        } catch (e) {
            console.error("Failed to fetch user:", e);
            setError('Failed to fetch user');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Fetch User</h2>
            <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter User ID"
            />
            <button onClick={fetchUser} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch User'}
            </button>

            {user && (
                <div>
                    <h3>User Details</h3>
                    <p>{user.displayInfo()}</p>
                    {/* Render other user details here */}
                </div>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default UserFetcher;
