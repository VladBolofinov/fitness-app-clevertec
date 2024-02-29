export enum FormValues {
    MESSAGE_CHECK_PASSWORD = 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
}

export const checkPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?!.*[^\w\d\s]).{8,}$/ ;
