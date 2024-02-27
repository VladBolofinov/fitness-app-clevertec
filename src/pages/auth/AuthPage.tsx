import React from 'react';
import './AuthPage.scss';
import {MyLoader} from "@pages/auth/Loader/MyLoader";
import {IAuthPageProps} from "@pages/auth/types/IAuthPageProps";
import {isLoadingRequestSelector} from "@redux/reducers/apiRequestSlice";
import {useSelector} from "react-redux";

const AuthPage: React.FC<IAuthPageProps> = ({children}) => {
    const isLoadingRequest = useSelector(isLoadingRequestSelector);
    return (
        <div className='auth-wrapper'>
            {(isLoadingRequest) ? <MyLoader/> : null}
            {children}
        </div>
    );
};
export default AuthPage;
