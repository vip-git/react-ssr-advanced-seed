// Library
import React, { useEffect } from 'react';
import { initialProfileModel, ProfileContext } from './profile.model';
import useProfilePage from '../../../../shared/state/containers/profile/profile-model.hooks';

interface ProfileProps {
    name: string;
}

const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
  const { profilePage, profileActions } = useProfilePage(initialProfileModel, ProfileContext);
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
