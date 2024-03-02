import React from 'react';
import './AuthPage.scss';
import {IAuthPageProps} from "@pages/auth/types/IAuthPageProps";

const AuthPage: React.FC<IAuthPageProps> = ({children}) => {
    return (
        <div className='auth-wrapper'>
            {children}
        </div>
    );
};
export default AuthPage;
