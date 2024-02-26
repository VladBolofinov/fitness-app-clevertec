import React from 'react';
import './ChangePassword.scss';
import {Input, Form, Button} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {apiRequestSlice, changePassword} from "@redux/reducers/apiRequestSlice";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {ForgetPasswordFields} from "@pages/main/components/types/IInputValues";
export const ChangePassword:React.FC = () => {
    const [changePasswordForm] = Form.useForm();
    const dispatch = useAppDispatch();
    const {saveConfirmPasswords} = apiRequestSlice.actions;
    const sendConfirmData = (values: ForgetPasswordFields) => {
        dispatch(saveConfirmPasswords({password: values.password, confirmPassword: values['password-compare']}));
        dispatch(changePassword({password: values.password, confirmPassword: values['password-compare']}));
    }
    return (
        <div className="wrapper-change-password-form">
            <div className="change-password-form">
                <span className='modal-header'>Восстановление аккаунта</span>
                <Form
                onFinish={sendConfirmData}
                form={changePasswordForm}
                name={"change-password"}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    help={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                    name="password"
                    rules={[{ required: true, message: '' }, { pattern: /^(?=.*[A-Z])(?=.*\d)(?!.*[^\w\d\s]).{8,}$/, message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой' }]}
                >
                    <Input.Password
                        placeholder="Новый пароль"
                        style={{ marginTop: '32px' }}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        data-test-id={'change-password'}
                    />
                </Form.Item>

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
                        data-test-id={'change-confirm-password'}
                    />
                </Form.Item>
                    <Form.Item shouldUpdate>
                        {() => (
                            <>
                                <Button
                                    type="primary"
                                    block
                                    htmlType="submit"
                                    style={{ marginTop: '32px' }}
                                    disabled={Boolean(changePasswordForm.getFieldsError().filter(({ errors }) => errors.length).length)}
                                    data-test-id={'change-submit-button'}
                                >Сохранить
                                </Button>
                            </>
                        )}
                    </Form.Item>
            </Form>
            </div>
        </div>
    );
};
