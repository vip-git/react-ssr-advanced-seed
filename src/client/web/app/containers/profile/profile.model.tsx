// Library
import React, { useState } from 'react';
import { ProfileComponentsEngine } from './profile.components';

const ProfileContext = React.createContext([{}, () => { }]);

const ProfileProvider = (props) => {
    const [profileModel, setProfileModel] = useState({
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
    });
    return (
        <ProfileContext.Provider value={[profileModel, setProfileModel]}>
            {props.children}
        </ProfileContext.Provider>
    );
};

export { ProfileContext, ProfileProvider };