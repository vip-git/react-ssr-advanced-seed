interface ProfileActions {
    getProfileData: (props: any) => void;
}
declare const useProfilePage: (initialProfileModel: any, profilePageContext: any) => {
    profileActions: ProfileActions;
    profilePage: unknown;
};
export default useProfilePage;
