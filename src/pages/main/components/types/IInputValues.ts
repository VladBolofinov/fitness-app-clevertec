export interface IInputValues {
    login: string;
    password: string;
    remember?: boolean;
    'password-compare'?: string;
}
export type ForgetPasswordFields = Pick<IInputValues, 'password' | 'password-compare'>;
