// Libraries
import React, { useContext } from 'react';
import { of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// Utils
import { RulesEngine } from '@omega-core/rules.engine-hooks';

// Context
import { } from './profile.model';

const useProfilePage = () => {
    const [profileContext] = useContext(ProfilePageContext);
    const { actions, rules } = initialProfileModel;
    const pageActions = Object.assign({}. actions);

    const [profilePage, getProfileData] = RulesEngine.applyRule({
        rules: [],
        successCallback: () => of(initialPayload).pipe(
            startWith(),
            map(() => {
                return (
                    <div> {'Success Result'} </div>
                );
            }),
            startWith((
                <div> {'Loading...'} </div>
            ))
        ),
        failureCallback: (failure) => of(
            <div> {'Some failure info'} </div>
        ),
        errorCallback: (error) => of(
            <div> {'I was here for errors'} </div>
        ),
    })

    pageActions.getProfileData = getProfileData;

    return {
        pageActions,
        profilePage
    };
}

export default useProfilePage;
