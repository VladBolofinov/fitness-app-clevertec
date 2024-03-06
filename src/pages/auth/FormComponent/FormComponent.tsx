import React, {useEffect} from 'react';
import './FormComponent.scss';
import {Button, Checkbox, Input, Form} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined} from "@ant-design/icons";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {
    apiRequestSlice, changePassword,
    checkEmail,
    authenticateUser,
    registerNewUser, googleAuthenticateUser
} from "@redux/reducers/apiRequestSlice";
import {IFormComponentProps} from "@pages/auth/types/IFormComponentProps";
import {IInputValues} from "@pages/main/components/types/IInputValues";
import {useSelector} from "react-redux";
import {getPassword} from "@redux/selectors/getApiRequestState/getPassword/getPassword";
import {
    getFirstConfirmPassword
} from "@redux/selectors/getApiRequestState/getFirstConfirmPassword/getFirstConfirmPassword";
import {
    getSecondConfirmPassword
} from "@redux/selectors/getApiRequestState/getSecondConfirmPassword/getSecondConfirmPassword";
import {getLogin} from "@redux/selectors/getApiRequestState/getLogin/getLogin";
import {getPreviousLocation} from "@redux/selectors/getRouterState/getPreviousLocation/getPreviousLocation";
import {checkPasswordRegex, FormValues} from "@pages/auth/types/formTypes";
import {endpoints, urls} from "@redux/types/httpStatusVars";

export const FormComponent: React.FC<IFormComponentProps> = ({type}) => {
    const [authForm] = Form.useForm();
    const [registrationForm] = Form.useForm();
    const dispatch = useAppDispatch();
    const previousLocation = useSelector(getPreviousLocation);
    const password = useSelector(getPassword);
    const firstConfirmPassword = useSelector(getFirstConfirmPassword);
    const secondConfirmPassword = useSelector(getSecondConfirmPassword);
    const login = useSelector(getLogin);
    const {saveRegDataBeforeError} = apiRequestSlice.actions;

    useEffect(() => {
        if (previousLocation[1]?.location === '/result/error') {
            dispatch(registerNewUser({login, password}));
        } else if (previousLocation[1]?.location === '/result/error-check-email') {
            dispatch(checkEmail(login));
        } else if (previousLocation[1]?.location === '/result/error-change-password') {
            dispatch(changePassword({password: firstConfirmPassword, confirmPassword: secondConfirmPassword}));
        }
    })
    const sendAuthData = (inputValues: IInputValues) => {
        const { login, password, remember } = inputValues;
        dispatch(authenticateUser({ login, password, remember }));
    };
    const sendRegistrationData = (values: IInputValues) => {
        const { login, password } = values;
        dispatch(saveRegDataBeforeError({login, password}));
        dispatch(registerNewUser({login, password}));
    }
    const sendForgetPassword = () => {
        if (!authForm.getFieldError('login').length && authForm.isFieldTouched('login')) {
            dispatch(saveRegDataBeforeError({login: authForm.getFieldValue('login'), password: ''}));
            dispatch(checkEmail(authForm.getFieldValue('login')));
        }
    }
    return (
            <Form
                onFinish={(type === 'auth') ? sendAuthData : sendRegistrationData}
                form={type === 'auth' ? authForm : registrationForm}
                name={type === 'auth' ? "enter-account" : "registration"}
                initialValues={{ remember: false }}
            >
                <Form.Item
                    name="login"
                    rules={[{ required: true, type: "email", message: '' }]}
                >
                    <Input
                        addonBefore="e-mail:"
                        style={{ marginBottom: type === 'auth' ? '8px' : '10px', marginTop: type === 'auth' ? '0px' : '10px' }}
                        data-test-id={type === 'auth' ? 'login-email' : 'registration-email'}
                    />
                </Form.Item>
                <Form.Item
                    help={type === 'auth' ? '' : FormValues.MESSAGE_CHECK_PASSWORD}
                    name="password"
                    rules={[{ required: true, message: '' }, { pattern: checkPasswordRegex, message: FormValues.MESSAGE_CHECK_PASSWORD }]}
                >
                    <Input.Password
                        placeholder="Пароль"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        data-test-id={type === 'auth' ? 'login-password' : 'registration-password'}
                    />
                </Form.Item>
                {type !== 'auth' && (
                    <Form.Item
                        name="password-compare"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: '' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Повторите пароль"
                            style={{ marginTop: '16px' }}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            data-test-id='registration-confirm-password'
                        />
                    </Form.Item>
                )}
                {type === 'auth'
                ? <Form.Item>
                    <div className='checkbox-wrapper'>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                        </Form.Item>
                        <Button type="link" onClick={sendForgetPassword} data-test-id='login-forgot-button'>Забыли пароль?</Button>
                    </div>
                </Form.Item>
                : null}
                <Form.Item shouldUpdate>
                    {() => (
                        <>
                            <Button
                                type="primary"
                                block
                                htmlType="submit"
                                style={{ marginTop: type === 'auth' ? '0px' : '32px', height: '40px' }}
                                data-test-id={type === 'auth' ?'login-submit-button' : 'registration-submit-button'}
                                disabled={type === 'auth' ? false :
                                    Boolean(registrationForm.getFieldsError().filter(({ errors }) => errors.length).length)
                                    || !(registrationForm.isFieldTouched('login')
                                        && registrationForm.isFieldTouched('password')
                                        && registrationForm.isFieldTouched('password-compare'))}
                            >Войти
                            </Button>
                            <Button
                                href={`${urls.MAIN_URL}${endpoints.GOOGLE}`}
                                block
                                onClick={()=>dispatch(googleAuthenticateUser())}
                                style={{ marginTop: '16px', height: '40px', paddingBottom: '0px' }}
                                icon={<span className='google-icon'><GooglePlusOutlined /></span>}>
                                Войти через Google
                            </Button>
                        </>
                    )}
                </Form.Item>
            </Form>
    );
};
