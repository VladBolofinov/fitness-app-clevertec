import React from 'react';
import './AuthPage.scss';
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import { fetchToken} from "@redux/reducers/apiRequestSlice";
import {history} from "@redux/configure-store";
import {MainLogoIconXl, MainLogoIconMd} from "@pages/main/components/customSvgIcons/customSvgIcons";
import {Tabs, Input, Checkbox, Button, Form, Grid} from "antd";
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    GooglePlusOutlined
} from "@ant-design/icons";
const { useBreakpoint } = Grid;
export const AuthPage: React.FC = () => {
    const [authForm] = Form.useForm();
    const [registrationForm] = Form.useForm();
    const screens = useBreakpoint();
    const dispatch = useAppDispatch();
    const sendAuthData = () => {
        const value = authForm.getFieldsValue();
        const {login, password, remember} = value;
        dispatch(fetchToken({email:login, password:password, rememberUser: remember}));
    }
    const sendRegistrationData = () => {
        const value = registrationForm.getFieldsValue();
        const {login, password, 'password-compare': passwordCompare} = value;
        //const {login, password, remember} = value;
        //dispatch(fetchToken({email:login, password:password, rememberUser: remember}));
    }
    return (
        <div className='auth-wrapper'>
            <div className="wrapper-entry-form">
                {(screens.xs) ? <MainLogoIconMd/> : <MainLogoIconXl/>}
                <div className="entry-form">
                    <Tabs
                        defaultActiveKey="1"
                        items={[
                            {
                                label: `Вход`,
                                key: '1',
                                children: <>
                                    <Form
                                        form={authForm}
                                        name="enter-account"
                                        initialValues={{ remember: true }}
                                    >
                                        <Form.Item
                                            name="login"
                                            rules={[{ required: true, type: "email", message: '' }]}
                                        >
                                            <Input
                                                addonBefore="e-mail:"
                                                style={{marginBottom: '8px'}}/>
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[{ required: true, message: '' }, { pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/, message: ''}]}
                                        >
                                            <Input.Password
                                                placeholder="Пароль"
                                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <div className='checkbox-wrapper'>
                                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                                <Checkbox>Запомнить меня</Checkbox>
                                            </Form.Item>
                                            <Button type="link">Забыли пароль?</Button>
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <>
                                                <Button type="primary"
                                                        block
                                                        htmlType={"submit"}
                                                        style={{marginTop: '0px'}}
                                                        onClick={sendAuthData}>Войти</Button>
                                                <Button block htmlType={"submit"} style={{marginTop: '16px'}} icon={(screens.xs) ? null : <GooglePlusOutlined />}
                                                onClick={()=>history.push('/result/error')}>Войти через Google</Button>
                                                </>
                                        </Form.Item>
                                    </Form>
                                </>
                            },
                            {
                                label: `Регистрация`,
                                key: '2',
                                children: <>
                                    <Form
                                        form={registrationForm}
                                        name="registration"
                                        initialValues={{ remember: true }}
                                    >
                                        <Form.Item
                                            name="login"
                                            rules={[{ required: true, type: "email", message: '' }]}
                                        >
                                            <Input
                                                addonBefore="e-mail:"
                                                style={{marginTop: '10px'}}/>
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            help='Пароль не менее 8 латинских букв с заглавной и цифрой'
                                            rules={[{ required: true }, { pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                                                message: 'Пароль не менее 8 латинских букв с заглавной и цифрой'}]}
                                        >
                                            <Input.Password
                                                placeholder="Пароль"
                                                style={{marginTop: '7px'}}
                                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="password-compare"
                                            dependencies={['password']}
                                            rules={[{required: true, message: ''},
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
                                                style={{marginTop: '16px'}}
                                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                            />
                                        </Form.Item>
                                        <Form.Item shouldUpdate>
                                            {() => (<>
                                                <Button
                                                    type="primary"
                                                    block
                                                    htmlType="submit"
                                                    style={{marginTop: '32px'}}
                                                    onClick={sendRegistrationData}
                                                    disabled={Boolean(registrationForm.getFieldsError().filter(({ errors }) => errors.length).length)
                                                        || !(registrationForm.isFieldTouched('login') && registrationForm.isFieldTouched('password') && registrationForm.isFieldTouched('password-compare'))}
                                                >
                                                    Войти
                                                </Button>
                                            <Button block htmlType={"submit"} style={{marginTop: '16px'}} icon={(screens.xs) ? null : <GooglePlusOutlined />}
                                                    onClick={sendRegistrationData}>Войти через Google</Button>
                                            </>)}
                                        </Form.Item>
                                    </Form>
                                </>
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};
