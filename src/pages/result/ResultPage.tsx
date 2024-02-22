import React from 'react';
import {history} from "@redux/configure-store";
import {MyLoader} from "@pages/auth/Loader/MyLoader";

export const ResultPage: React.FC = () => {
    return (
        <div>
            Регистрация успешна
            Регистрация прошла успешно. Зайдите в приложение, используя свои email и пароль
            <MyLoader />
            <button onClick={() => history.push('/auth')}>войти</button>
        </div>
    );
};
