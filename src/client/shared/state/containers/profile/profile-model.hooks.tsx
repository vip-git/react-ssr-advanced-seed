/* eslint-disable import/no-extraneous-dependencies */
// Libraries
import React from 'react';
import { of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// Utils
import { RulesEngine } from '@omega-core/utils/rules.engine-hooks';

interface ProfileActions {
    getProfileData: (props: any) => void;
};

const useProfilePage = (initialProfileModel: any, profilePageContext: any) => {
    // const [profileContext] = useContext(profilePageContext);
    const { actions, rules } = initialProfileModel;
    const profileActions: ProfileActions = { ...actions};

    const [profilePage, getProfileData] = RulesEngine.applyRule({
        rules: [],
        successCallback: (initialPayload) => of(initialPayload).pipe(
            startWith((
                <div> 
                    {'Loading...'}
                </div>
            )),
            map(() => {
                return (
                    <div> 
                        {'Success Result'}
                    </div>
                );
            }),
        ),
        failureCallback: (failure) => of(
            <div> 
                {'Some failure info'}
            </div>
        ),
        errorCallback: (error) => of(
            <div> 
                {'I was here for errors'}
            </div>
        ),
    })

    profileActions.getProfileData = getProfileData;

    return {
        profileActions,
        profilePage
    };
}

export default useProfilePage;
