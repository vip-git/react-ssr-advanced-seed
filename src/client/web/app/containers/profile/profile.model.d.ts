import React from 'react';
declare const ProfileContext: React.Context<{}[]>;
declare const initialProfileModel: {
    container: boolean;
    attributes: {};
    i18nKeys: {};
    libraries: {
        React: typeof React;
    };
    components: {};
    actions: {};
    rules: {};
    services: {};
};
declare const ProfileProvider: (props: any) => JSX.Element;
export { ProfileContext, ProfileProvider, initialProfileModel };
