import React, { useEffect } from 'react';
import useProfilePage from './profile-model.hooks';

interface ProfileProps {
    name: string;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const { profilePage, profileActions } = useProfilePage();
  useEffect(() => {
    profileActions.getProfileData({});
  }, []);
  return (
      <div> 
        {'i was here'} 
        {profilePage}
      </div>
  );
};

export default Profile;
