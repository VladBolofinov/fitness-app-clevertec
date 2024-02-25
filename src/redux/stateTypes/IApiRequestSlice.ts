export interface IApiRequest {
    jwt: string;
    error: string;
    isLoadingRequest: boolean;
    isErrorStatus: boolean;
    isSuccessRequest: boolean;
    checkCodeInputValue: string;
    login: string;
    password: string;
    firstConfirmPassword: string;
    secondConfirmPassword: string;
}
