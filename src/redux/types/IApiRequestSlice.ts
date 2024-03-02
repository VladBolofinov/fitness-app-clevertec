export interface IApiRequest {
    jwt: string;
    isLoadingRequest: boolean;
    isErrorStatus: boolean;
    isSuccessRequest: boolean;
    isCollapseSider: boolean;
    checkCodeInputValue: string;
    login: string;
    password: string;
    firstConfirmPassword: string;
    secondConfirmPassword: string;
}
