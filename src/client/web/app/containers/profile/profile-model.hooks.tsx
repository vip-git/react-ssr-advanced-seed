// Libraries
import React, { useContext } from 'react';
import { of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// Utils
import { RulesEngine } from '@omega-core/rules.engine-hooks';

// Context
import { } from './profile.model';

interface ProfileActions {
    getProfileData: (props: any) => void;
};

const useProfilePage = () => {
    const [profileContext] = useContext(ProfilePageContext);
    const { actions, rules } = initialProfileModel;
    const profileActions: ProfileActions = Object.assign({}. actions);

    const [profilePage, getProfileData] = RulesEngine.applyRule({
        rules: [],
        successCallback: () => of(initialPayload).pipe(
            startWith((
                <div> {'Loading...'} </div>
            )),
            map(() => {
                return (
                    <div> {'Success Result'} </div>
                );
            }),
        ),
        failureCallback: (failure) => of(
            <div> {'Some failure info'} </div>
        ),
        errorCallback: (error) => of(
            <div> {'I was here for errors'} </div>
        ),
    })

    profileActions.getProfileData = getProfileData;

    return {
        profileActions,
        profilePage
    };
}

export default useProfilePage;
