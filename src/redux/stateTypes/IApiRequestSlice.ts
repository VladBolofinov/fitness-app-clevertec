export interface IApiRequest {
    jwt: string;
    error: string;
    isLoadingToken: boolean;
    inputLoginValue: string;
    inputPasswordValue: string;
    inputPassDuplicate: string;
    inputRememberUser:boolean;
}
