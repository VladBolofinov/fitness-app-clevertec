import React from 'react';
import './AuthPage.scss';
import {IAuthPageProps} from "@pages/auth/types/IAuthPageProps";

const AuthPage: React.FC<IAuthPageProps> = ({children}) => (
        <div className='auth-wrapper'>{children}</div>
    );
export default AuthPage;
