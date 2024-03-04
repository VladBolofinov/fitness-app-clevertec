export enum httpStatusVars {
    '_200' = 200,
    '_201' = 201,
    '_401' = 401,
    '_404' = 404,
    '_409' = 409,
    '_403' = 403,
}

export enum httpMethods {
    'POST'='post',
    'GET' = 'get'
}

export enum endpoints {
    'LOGIN'= '/auth/login',
    'GOOGLE' = '/auth/google',
    'REGISTRATION'= '/auth/registration',
    'CHECK_EMAIL'= '/auth/check-email',
    'CONFIRM_EMAIL'= '/auth/confirm-email',
    'CHANGE_PASSWORD'= '/auth/change-password',
    'FEEDBACK' = '/feedback',
}
export enum urls {
    MAIN_URL = 'https://marathon-api.clevertec.ru'
}
