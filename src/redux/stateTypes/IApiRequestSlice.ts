export interface IApiRequest {
    jwt: string;
    error: string;
    isLoadingRequest: boolean;
    isErrorStatus: boolean;
    isRegistrationSuccess: boolean;
    login: string;
    password: string;
}
