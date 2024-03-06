export enum FormValuesText {
    MESSAGE_CHECK_PASSWORD = "Пароль не менее 8 символов, с заглавной буквой и цифрой",
    MESSAGE_COMPARE_PASSWORD = "Пароли не совпадают"
}
export enum PlaceholdersText {
    PASSWORD = "Пароль",
    CONFIRM_PASSWORD = "Повторите пароль",
    NEW_PASSWORD = "Новый пароль"
}
export const checkPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?!.*[^\w\d\s]).{8,}$/ ;
