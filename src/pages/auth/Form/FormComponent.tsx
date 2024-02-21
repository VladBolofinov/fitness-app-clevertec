import React from 'react';
import './FormComponent.scss';
import {Button, Checkbox, Grid, Input, Form} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined} from "@ant-design/icons";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {fetchToken, registerNewUser} from "@redux/reducers/apiRequestSlice";
import {IFormComponentProps} from "@pages/auth/types/IFormComponentProps";
import {IInputValues} from "@pages/main/components/types/IInputValues";
const { useBreakpoint } = Grid;
export const FormComponent: React.FC<IFormComponentProps> = ({type}) => {
    const [authForm] = Form.useForm();
    const [registrationForm] = Form.useForm();
    const screens = useBreakpoint();
    const dispatch = useAppDispatch();
    const sendAuthData = (inputValues: IInputValues) => {
        console.log('Received values of form:', inputValues);
        const { login, password, remember } = inputValues;
        dispatch(fetchToken({ login, password, remember }));
    };
    const sendRegistrationData = (values: any) => {
        const { login, password } = values;
        dispatch(registerNewUser({login, password}));
    }
    return (
        <>
            <Form
                onFinish={(type === 'auth') ? sendAuthData : sendRegistrationData}
                form={type === 'auth' ? authForm : registrationForm}
                name={type === 'auth' ? "enter-account" : "registration"}
                initialValues={{ remember: true }}
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
                    name="password"
                    rules={[{ required: true, message: '' }, { pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/, message: '' }]}
                >
                    <Input.Password
                        placeholder="Пароль"
                        style={{ marginBottom: type === 'auth' ? '16px' : '7px', marginTop: type === 'auth' ? '0px' : '7px' }}
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
                )}{type === 'auth'
                ? <Form.Item>
                    <div className='checkbox-wrapper'>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                        </Form.Item>
                        <Button type="link" data-test-id='login-forgot-button'>Забыли пароль?</Button>
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
                                style={{ marginTop: type === 'auth' ? '0px' : '32px' }}
                                data-test-id={type === 'auth' ?'login-submit-button' : 'registration-submit-button'}
                                disabled={type === 'auth' ? false :
                                    Boolean(registrationForm.getFieldsError().filter(({ errors }) => errors.length).length)
                                    || !(registrationForm.isFieldTouched('login')
                                        && registrationForm.isFieldTouched('password')
                                        && registrationForm.isFieldTouched('password-compare'))}
                            >Войти
                            </Button>
                            <Button
                                block
                                style={{ marginTop: '16px' }}
                                icon={(screens.xs) ? null : <GooglePlusOutlined />}>
                                Войти через Google
                            </Button>
                        </>
                    )}
                </Form.Item>
            </Form>
        </>
    );
};
