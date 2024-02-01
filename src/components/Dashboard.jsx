import React, { useEffect, useState } from 'react';
import Navlink from './Navbar/Navbar';
import { protecdInstance } from '../services/instance';

function Profile() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    aternateEmail: '',
    Contact: '',
    gender: '',
    address: '',
  });

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    try {
      const response = await protecdInstance.get('/ticket/profile');
      setProfileData(response.data);
      console.log(profileData)
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await protecdInstance.post('/ticket/profile', profileData);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navlink />
      <h1>Profile</h1>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={profileData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" name="email" value={profileData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Alternate Email:</label>
        <input
          type="text"
          name="aternateEmail"
          value={profileData.aternateEmail}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Contact:</label>
        <input type="text" name="Contact" value={profileData.Contact} onChange={handleChange} />
      </div>
      <div>
        <label>Gender:</label>
        <input type="text" name="gender" value={profileData.gender} onChange={handleChange} />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={profileData.address} onChange={handleChange} />
      </div>
      <div>
        <button onClick={handleUpdateProfile}>Update Profile</button>
      </div>
    </div>
  );
}

export default Profile;
