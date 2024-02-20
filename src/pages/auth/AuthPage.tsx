import React from 'react';
import './AuthPage.scss';
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks";
import {apiRequestSlice, fetchToken} from "@redux/reducers/apiRequestSlice";
import {history} from "@redux/configure-store";
import {MainLogoIconXl} from "@pages/main/components/customSvgIcons/customSvgIcons";
import {Tabs, Input, Checkbox, Button, Form} from "antd";
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    GooglePlusOutlined, LockOutlined,
    UserOutlined
} from "@ant-design/icons";

export const AuthPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const { setInputPasswordValue, setInputLoginValue, setInputRememberUser} = apiRequestSlice.actions;
    const {inputLoginValue, inputPasswordValue, inputRememberUser} = useAppSelector(state => state.apiRequestSlice);
        const onFinish = (values: any) => {
            console.log('Received values of form: ', values);
        };
    return (
        <div className='auth-wrapper'>
            <div className="wrapper-entry-form">
                <MainLogoIconXl/>
                <div className="entry-form">
                    <Tabs
                        defaultActiveKey="1"
                        //onChange={onChange}
                        items={[
                            {
                                label: `Вход`,
                                key: '1',
                                children: <>
                                    <Form
                                        name="normal_login"
                                        className="login-form"
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name="username"
                                            rules={[{ required: true, message: '' }]}
                                        >
                                            <Input
                                                addonBefore="e-mail:"
                                                style={{marginBottom: '8px'}}
                                                onChange={(e) => dispatch(setInputLoginValue(e.target.value))}/>
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your Password!' }]}
                                        >
                                            <Input.Password
                                                placeholder="Пароль"
                                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                onChange={(e) => dispatch(setInputPasswordValue(e.target.value))}
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <div className='checkbox-wrapper'>
                                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                                <Checkbox onChange={(e) => dispatch(setInputRememberUser())}>Запомнить меня</Checkbox>
                                            </Form.Item>
                                            <Button type="link">Забыли пароль?</Button>
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <div className="btn-wrapper">
                                                <Button type="primary"
                                                        block
                                                        htmlType={"submit"}
                                                        style={{marginTop: '0px'}}
                                                        onClick={() => dispatch(fetchToken({email:inputLoginValue, password:inputPasswordValue, rememberUser: inputRememberUser}))}>Войти</Button>
                                                <Button block htmlType={"submit"} style={{marginTop: '16px'}} icon={<GooglePlusOutlined />} onClick={()=>history.push('/result/error')}>Войти через Google</Button>
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </>
                            },
                            {
                                label: `Регистрация`,
                                key: '2',
                                children: <>
                                    <Form
                                        name="normal_login"
                                        className="login-form"
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name="username"
                                            rules={[{ required: true, message: '' }]}
                                        >
                                            <Input
                                                addonBefore="e-mail:"
                                                style={{marginTop: '10px'}}
                                                onChange={(e) => dispatch(setInputLoginValue(e.target.value))}/>
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your Password!' }]}
                                        >
                                            <Input.Password
                                                placeholder="Пароль"
                                                style={{marginTop: '7px'}}
                                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                onChange={(e) => dispatch(setInputPasswordValue(e.target.value))}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your Password!' }]}
                                        >
                                            <Input.Password
                                                placeholder="Повторите пароль"
                                                style={{marginTop: '22px'}}
                                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                                onChange={(e) => dispatch(setInputPasswordValue(e.target.value))}
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary"
                                                    block
                                                    htmlType={"submit"}
                                                    style={{marginTop: '32px'}}
                                                    onClick={() => dispatch(fetchToken({email:inputLoginValue, password:inputPasswordValue, rememberUser: inputRememberUser}))}>Войти</Button>
                                            <Button block htmlType={"submit"} style={{marginTop: '16px'}} icon={<GooglePlusOutlined />} onClick={()=>history.push('/result/error')}>Войти через Google</Button>
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
