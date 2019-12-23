// Library
import React, { useState } from 'react';
import { ProfileComponentsEngine } from './profile.components';

const ProfileContext = React.createContext([{}, () => { }]);
const initialProfileModel = {
    container: true,
    attributes: {
    },
    i18nKeys: {},
    libraries: {
        React,
    },
    components: {
        ...ProfileComponentsEngine
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