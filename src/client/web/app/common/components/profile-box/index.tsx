// Library
import React from 'react';

interface ProfileBoxProps {
  name?: string;
}

const ProfileBox: React.SFC<ProfileBoxProps> = ({ name }) => {
  return (
    <div>
      Profile Info
      {name} 
    </div>
  );
};

export default ProfileBox;