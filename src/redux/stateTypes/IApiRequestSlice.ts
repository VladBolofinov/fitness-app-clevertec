export interface IApiRequest {
    jwt: string;
    error: string;
    isLoadingRequest: boolean;
    isErrorStatus: boolean;
    isSuccessRequest: boolean;
    login: string;
    password: string;
}
