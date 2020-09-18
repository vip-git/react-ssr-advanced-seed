// Library
import React, { useState } from 'react';

const ProfileContext = React.createContext([{}, () => { }]);
const initialProfileModel = {
    container: true,
    attributes: {
    },
    i18nKeys: {},
    libraries: {
        React,
    },
    actions: {
    },
    rules: {
    },
    services: {
    },
};

const ProfileProvider = (props) => {
    const [profileModel, setProfileModel] = useState(initialProfileModel);
    const { children } = props;
    return (
        <ProfileContext.Provider value={[profileModel, setProfileModel]}>
            {children}
        </ProfileContext.Provider>
    );
};

export { ProfileContext, ProfileProvider, initialProfileModel };