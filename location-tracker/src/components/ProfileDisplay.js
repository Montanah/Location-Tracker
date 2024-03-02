import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileDisplay = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
    
            if (!accessToken) {
                setLoading(false);
                return;
            }
    
            const response = await axios.get('#api fetching user profile', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
    
            if (response.status === 200) {
                const { login, avatar_url, name } = response.data;
                setUserProfile({ login, avatar_url, name });
            }
    
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            // Handle errors more gracefully, e.g., show an error message to the user.
            setLoading(false);
        }
    };
    
    return (
        <div style={{ paddingBottom: '0px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {userProfile && (
                <>
                    <img
                        src={userProfile.avatar_url}
                        alt="User Avatar"
                        id='profilepic'
                        style={{ width: '80%', height: '50%', borderRadius: '50%', marginTop: '15px' }}
                    />
                    <p id='profilename' style={{ fontSize: '13px', fontStyle: 'italic', color: 'white' }}>
                        {userProfile.name || userProfile.login}
                    </p>
                </>
            )}
            {loading && <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'white' }}>Loading...</p>}
            {!userProfile && !loading && <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'white' }}>No profile found</p>}
        </div>
    );
};

export default ProfileDisplay;