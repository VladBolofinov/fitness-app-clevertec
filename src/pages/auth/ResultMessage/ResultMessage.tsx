import React from 'react';
import './ResultMessage.scss';
import warningImg from '../../../assets/icons/warningImg.png';
import successImg from '../../../assets/icons/successImg.png';
import errorExist from '../../../assets/icons/errorExist.png';
import {Button} from "antd";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {push} from "redux-first-history";
import {apiRequestSlice} from "@redux/reducers/apiRequestSlice";
interface IResultMessage {
    type: string;
}
interface IDataMessage {
    [key: string]: {
        img: string;
        headerMessage: string;
        descrMessage: string;
        btnText: string;
        btnClickEvent: () => {}; //типизируй нормально
        dataTestId: string;
    };
}
export const ResultMessage:React.FC<IResultMessage> = ({type}) => {
    const {deleteErrorStatus, deleteRegistrationStatus} = apiRequestSlice.actions;
    const dispatch = useAppDispatch();

    const dataMessage:IDataMessage = {
        'error-login': {
            img: warningImg,
            headerMessage: 'Вход не выполнен',
            descrMessage: 'Что-то пошло не так. Попробуйте еще раз',
            btnText: 'Повторить',
            btnClickEvent: () => {
                dispatch(push('/auth'));
                dispatch(deleteErrorStatus());
            },
            dataTestId: 'login-retry-button'
        },
        'success': {
            img: successImg,
            headerMessage: 'Регистрация успешна',
            descrMessage: 'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
            btnText: 'Войти',
            btnClickEvent: () => {
                dispatch(push('/auth'));
                dispatch(deleteRegistrationStatus());
            },
            dataTestId: 'registration-enter-button'
        },
        'error-user-exist': {
            img: errorExist,
            headerMessage: 'Данные не сохранились',
            descrMessage: 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
            btnText: 'Назад к регистрации',
            btnClickEvent: () => {
                dispatch(push('/auth/registration'));
                dispatch(deleteErrorStatus());
            },
            dataTestId: 'registration-back-button'
        },
        'error': {
            img: errorExist,
            headerMessage: 'Данные не сохранились',
            descrMessage: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте еще раз.',
            btnText: 'Повторить',
            btnClickEvent: () => {
                dispatch(push('/auth/registration'));
                dispatch(deleteErrorStatus());
                //пропиши логику чтобы данные логин и пароль где-то сохранились и после редиректа пошел сразу запрос новый
            },
            dataTestId: 'registration-retry-button'
        }
    }
    return (
        <div className='error-message-modal'>
            <div className='modal-wrapper'>
                <img src={dataMessage[type].img} alt="warning"/>
                <p className='message-header'>{dataMessage[type].headerMessage}</p>
                <p className='message-descr'>{dataMessage[type].descrMessage}</p>
                <Button type="primary" data-test-id={dataMessage[type].dataTestId} block onClick={dataMessage[type].btnClickEvent}>{dataMessage[type].btnText}</Button>
            </div>
        </div>
    );
};
