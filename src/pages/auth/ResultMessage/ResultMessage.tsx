import React from 'react';
import './ResultMessage.scss';
import {Button, Result} from "antd";
import VerificationInput from "react-verification-input";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks";
import {push} from "redux-first-history";
import {apiRequestSlice, confirmEmail} from "@redux/reducers/apiRequestSlice";
interface IResultMessage {
    type: string;
}
interface IDataMessage {
    [key: string]: {
        img: string;
        headerMessage: string;
        descrMessage: string;
        btnText: string;
        status: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500' | undefined,
        classname: 'error-message-modal warning' | 'error-message-modal' | 'error-message-modal 500',
        btnWidth: string;
        btnClickEvent: () => {}; //типизируй нормально
        dataTestId: string;
    };
}
export const ResultMessage:React.FC<IResultMessage> = ({type}) => {
    const {deleteErrorStatus, deleteSuccessStatus, setCheckCodeInput} = apiRequestSlice.actions;
    const {login, isErrorStatus, checkCodeInputValue} = useAppSelector(state => state.apiRequestSlice);
    const dispatch = useAppDispatch();
    const dataMessage:IDataMessage = {
        'error-login': {
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
        'success': {
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
        'error-user-exist': {
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
        'error': {
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
        'error-check-email-no-exist' : {
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
        'error-check-email': {
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
        'confirm-email': {
            headerMessage: (isErrorStatus) ? 'Неверный код. Введите код для восстановления аккаунта' : 'Введите код для восстановления аккаунта',
            descrMessage: `Мы отправили вам на e-mail ${login} шестизначный код. Введите его в поле ниже.`,
            btnText: 'Назад',
            status: (isErrorStatus) ? 'error' : undefined,
            classname: 'error-message-modal big',
            btnWidth: '85px',
            btnClickEvent: () => {}, //отрефактори потом
            dataTestId: 'verification-input'
        },
        'error-change-password': {
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
        'success-change-password': {
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
                                onComplete={(value) => {dispatch(confirmEmail({login: login, code: value}))}}
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
