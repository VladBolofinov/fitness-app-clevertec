import React from 'react';
import './AuthPage.scss';
import {MyLoader} from "@pages/auth/Loader/MyLoader";
import {useAppSelector} from "@hooks/typed-react-redux-hooks";
import {IAuthPageProps} from "@pages/auth/types/IAuthPageProps";

export const AuthPage: React.FC<IAuthPageProps> = ({children}) => {
    const {isLoadingRequest} = useAppSelector(state => state.apiRequestSlice);
    return (
        <div className='auth-wrapper'>
            {(isLoadingRequest) ? <MyLoader/> : null}
            {children}
        </div>
    );
};
