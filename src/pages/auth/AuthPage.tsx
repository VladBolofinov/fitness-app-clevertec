import React from 'react';
import './AuthPage.scss';
import {MyLoader} from "@pages/auth/Loader/MyLoader";
import {IAuthPageProps} from "@pages/auth/types/IAuthPageProps";
import {useAppSelector} from "@hooks/typed-react-redux-hooks";

const AuthPage: React.FC<IAuthPageProps> = ({children}) => {
    const {isLoadingRequest} = useAppSelector(state => state.apiRequestSlice);
    return (
        <div className='auth-wrapper'>
            {(isLoadingRequest) ? <MyLoader/> : null}
            {children}
        </div>
    );
};
export default AuthPage;
