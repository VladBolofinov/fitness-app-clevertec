import React, {useMemo} from 'react';
import './ResultMessage.scss';
import {Button, Result} from "antd";
import VerificationInput from "react-verification-input";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {push} from "redux-first-history";
import {
    apiRequestSlice,
    confirmEmail
} from "@redux/reducers/apiRequestSlice";
import {IResultMessageData} from "@pages/auth/types/IResultMessageData";
import {
    MessageTypeError,
    MessageTypeSuccess
} from "@pages/auth/ResultMessage/messageTypes";
import {useSelector} from "react-redux";
import {getCheckCodeInputValue} from "@redux/selectors/getApiRequestState/getCheckCodeInputValue/getCheckCodeInputValue";
import {getIsErrorStatus} from "@redux/selectors/getApiRequestState/getIsErrorStatus/getIsErrorStatus";
import {getLogin} from "@redux/selectors/getApiRequestState/getLogin/getLogin";
interface IResultMessage {
    type: string;
}
export const ResultMessage:React.FC<IResultMessage> = ({type}) => {
    const {deleteErrorStatus, deleteSuccessStatus, setCheckCodeInput} = apiRequestSlice.actions;
    const dispatch = useAppDispatch();
    const isErrorStatus = useSelector(getIsErrorStatus);
    const login = useSelector(getLogin);
    const checkCodeInputValue = useSelector(getCheckCodeInputValue);
    const dataMessage:IResultMessageData = useMemo(() => {
        return {
            [MessageTypeError.ERROR_LOGIN]: {
                headerMessage: 'Вход не выполнен',
                descrMessage: 'Что-то пошло не так. Попробуйте еще раз',
                btnText: 'Повторить',
                status: 'warning',
                classname: 'error-message-modal warning',
                btnWidth: '100%',
                btnClickEvent: () => {
                    dispatch(push('/auth'));
                    dispatch(deleteErrorStatus());
                },
                dataTestId: 'login-retry-button'
            },
            [MessageTypeSuccess.SUCCESS]: {
                headerMessage: 'Регистрация успешна',
                descrMessage: 'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
                btnText: 'Войти',
                status: 'success',
                classname: 'error-message-modal warning',
                btnWidth: '100%',
                btnClickEvent: () => {
                    dispatch(push('/auth'));
                    dispatch(deleteSuccessStatus());
                },
                dataTestId: 'registration-enter-button'
            },
            [MessageTypeError.ERROR_USER_EXIST]: {
                headerMessage: 'Данные не сохранились',
                descrMessage: 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
                btnText: 'Назад к регистрации',
                status: 'error',
                classname: 'error-message-modal warning',
                btnWidth: '100%',
                btnClickEvent: () => {
                    dispatch(push('/auth/registration'));
                    dispatch(deleteErrorStatus());
                },
                dataTestId: 'registration-back-button'
            },
            [MessageTypeError.ERROR]: {
                headerMessage: 'Данные не сохранились',
                descrMessage: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте еще раз.',
                btnText: 'Повторить',
                status: 'error',
                classname: 'error-message-modal warning',
                btnWidth: '100%',
                btnClickEvent: () => {
                    dispatch(push('/auth/registration'));
                    dispatch(deleteErrorStatus());
                },
                dataTestId: 'registration-retry-button'
            },
            [MessageTypeError.ERROR_CHECK_EMAIL_NO_EXIST] : {
                headerMessage: 'Такой e-mail не зарегистрирован',
                descrMessage: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.',
                btnText: 'Попробовать снова',
                status: 'error',
                classname: 'error-message-modal',
                btnWidth: '167px',
                btnClickEvent: () => {
                    dispatch(push('/auth'));
                    dispatch(deleteErrorStatus());
                },
                dataTestId: 'check-retry-button'
            },
            [MessageTypeError.ERROR_CHECK_EMAIL]: {
                headerMessage: 'Что-то пошло не так',
                descrMessage: 'Произошла ошибка, попробуйте отправить форму еще раз.',
                btnText: 'Назад',
                status: '500',
                classname: 'error-message-modal big',
                btnWidth: '85px',
                btnClickEvent: () => {
                    dispatch(push('/auth'));
                    dispatch(deleteErrorStatus());
                },
                dataTestId: 'check-back-button'
            },
            [MessageTypeSuccess.CONFIRM_EMAIL]: {
                headerMessage: (isErrorStatus) ? 'Неверный код. Введите код для восстановления аккаунта' : 'Введите код для восстановления аккаунта',
                descrMessage: <span>Мы отправили вам на e-mail <span className='descr-message-email'>{login}</span> шестизначный код.Введите его в поле ниже.</span>,
                btnText: 'Назад',
                status: (isErrorStatus) ? 'error' : undefined,
                classname: 'error-message-modal big',
                btnWidth: '85px',
                dataTestId: 'verification-input'
            },
            [MessageTypeError.ERROR_CHANGE_PASSWORD]: {
                headerMessage: 'Данные не сохранились',
                descrMessage: 'Что-то пошло не так. Попробуйте еще раз',
                btnText: 'Повторить',
                status: 'error',
                classname: 'error-message-modal warning',
                btnWidth: '100%',
                btnClickEvent: () => {
                    dispatch(push('/auth'));
                    dispatch(deleteErrorStatus());
                },
                dataTestId: 'change-retry-button'
            },
            [MessageTypeError.SUCCESS_CHANGE_PASSWORD]: {
                headerMessage: 'Пароль успешно изменен',
                descrMessage: 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
                btnText: 'Вход',
                status: 'success',
                classname: 'error-message-modal warning',
                btnWidth: '100%',
                btnClickEvent: () => {
                    dispatch(push('/auth'));
                    dispatch(deleteSuccessStatus());
                },
                dataTestId: 'change-entry-button'
            }
        }
    }, [isErrorStatus, login])
    return (
        <div className={dataMessage[type].classname}>
            <Result
                status={dataMessage[type].status}
                title={dataMessage[type].headerMessage}
                subTitle={dataMessage[type].descrMessage}
                extra={
                <>
                    {(type === 'confirm-email')
                        ? null
                        :
                        <Button type="primary"
                                style={{width: dataMessage[type].btnWidth}}
                                data-test-id={dataMessage[type].dataTestId}
                                block onClick={dataMessage[type].btnClickEvent}>
                            {dataMessage[type].btnText}
                        </Button> }
                    {(type === 'confirm-email')
                        ? <>
                            <VerificationInput
                                value={checkCodeInputValue}
                                inputProps={{'data-test-id' : dataMessage[type].dataTestId}}
                                placeholder={''}
                                onChange={(value) => {dispatch(setCheckCodeInput(value))}}
                                onComplete={(value) => {
                                    dispatch(confirmEmail({login: login, code: value}));
                                    dispatch(setCheckCodeInput(''));
                                }}
                                classNames={{
                                    container: "input-wrapper",
                                    character: "input-character",
                                    characterInactive: (isErrorStatus && checkCodeInputValue === '') ? "input-character-inactive-error" : "input-character-inactive",
                                    characterSelected: "input-character-selected",
                                    characterFilled: "input-character-filled",
                                }}
                            />
                            <span className='extra-subTitle'>Не пришло письмо? Проверьте папку Спам.</span>
                        </> : null}
                </>
                }
            />
        </div>
    );
};
