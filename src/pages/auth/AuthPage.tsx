import React from 'react';
import './AuthPage.scss';
import {MyLoader} from "@pages/auth/Loader/MyLoader";
import {IAuthPageProps} from "@pages/auth/types/IAuthPageProps";
import {useSelector} from "react-redux";
import {getIsLoadingRequest} from "@redux/selectors/getApiRequestState/getIsLoadingRequest/getIsLoadingRequest";

const AuthPage: React.FC<IAuthPageProps> = ({children}) => {
    const isLoadingRequest = useSelector(getIsLoadingRequest);
    return (
        <div className='auth-wrapper'>
            {(isLoadingRequest) ? <MyLoader/> : null}
            {children}
        </div>
    );
};
export default AuthPage;
