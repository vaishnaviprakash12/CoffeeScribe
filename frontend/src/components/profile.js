// Profile.js

import React from 'react';
import MainScreen from './MainScreen'; // Assuming you have a MainScreen component for layout
import { useSelector } from 'react-redux';

function Profile() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <MainScreen title="My Profile">
      <div>
        <h2>User Profile</h2>
        {userInfo ? (
          <div>
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            {/* Add more details as needed */}
          </div>
        ) : (
          <p>Please log in to view your profile.</p>
        )}
      </div>
    </MainScreen>
  );
}

export default Profile;
