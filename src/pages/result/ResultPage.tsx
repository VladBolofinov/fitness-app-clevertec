import React from 'react';
import {history} from "@redux/configure-store";

export const ResultPage: React.FC = () => {
    return (
        <div>
            Регистрация успешна
            Регистрация прошла успешно. Зайдите в приложение, используя свои email и пароль
            <button onClick={() => history.push('/auth')}>войти</button>
        </div>
    );
};
