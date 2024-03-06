import React, {useEffect} from "react";
import "./ChangePassword.scss";
import {Input, Form, Button} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {apiRequestSlice, changePassword} from "@redux/reducers/apiRequestSlice";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {ForgetPasswordFields} from "@pages/main/components/types/IInputValues";
import {history} from "@redux/configure-store";
import {useSelector} from "react-redux";
import {getIsSuccessRequest} from "@redux/selectors/getApiRequestState/getIsSuccessRequest/getIsSuccessRequest";
import {checkPasswordRegex, FormValuesText, PlaceholdersText} from "@pages/auth/types/formTypes";
import {AppRoutes} from "../../../router/routeConfig";

export const ChangePassword:React.FC = () => {
    const [changePasswordForm] = Form.useForm();
    const dispatch = useAppDispatch();
    const {saveConfirmPasswords} = apiRequestSlice.actions;
    const isSuccessRequest = useSelector(getIsSuccessRequest);
    const sendConfirmData = (values: ForgetPasswordFields) => {
        dispatch(saveConfirmPasswords({password: values.password, confirmPassword: values["password-compare"]}));
        dispatch(changePassword({password: values.password, confirmPassword: values["password-compare"]}));
    }
    useEffect(() => {
        if (!isSuccessRequest) {
            history.push(AppRoutes.AUTH);
        }
    },[])
    return (
        <div className="wrapper-change-password-form">
            <div className="change-password-form">
                <span className="modal-header">Восстановление аккаунта</span>
                <Form
                onFinish={sendConfirmData}
                form={changePasswordForm}
                name={"change-password"}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    help={FormValuesText.MESSAGE_CHECK_PASSWORD}
                    name="password"
                    rules={[{ required: true, message: "" }, { pattern: checkPasswordRegex, message: FormValuesText.MESSAGE_CHECK_PASSWORD }]}
                >
                    <Input.Password
                        placeholder={PlaceholdersText.NEW_PASSWORD}
                        style={{ marginTop: "32px" }}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        data-test-id="change-password"
                    />
                </Form.Item>
                <Form.Item
                    name="password-compare"
                    dependencies={["password"]}
                    rules={[
                        { required: true, message: "" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(FormValuesText.MESSAGE_COMPARE_PASSWORD));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder={PlaceholdersText.CONFIRM_PASSWORD}
                        style={{ marginTop: "16px" }}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        data-test-id="change-confirm-password"
                    />
                </Form.Item>
                    <Form.Item shouldUpdate>
                        {() => (
                            <>
                                <Button
                                    type="primary"
                                    block
                                    htmlType="submit"
                                    style={{ marginTop: "32px" }}
                                    disabled={Boolean(changePasswordForm.getFieldsError().filter(({ errors }) => errors.length).length)}
                                    data-test-id="change-submit-button"
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
