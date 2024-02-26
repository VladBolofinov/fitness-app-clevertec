import React from 'react';
import './AuthPage.scss';
import {MyLoader} from "@pages/auth/Loader/MyLoader";
import {useAppSelector} from "@hooks/typed-react-redux-hooks";
import {IAuthPageProps} from "@pages/auth/types/IAuthPageProps";
import {isLoadingRequestSelector} from "@redux/selectors/selectorsApiRequestSlice";
const AuthPage: React.FC<IAuthPageProps> = ({children}) => {
    const isLoadingRequest = useAppSelector(isLoadingRequestSelector);
    return (
        <div className='auth-wrapper'>
            {(isLoadingRequest) ? <MyLoader/> : null}
            {children}
        </div>
    );
};
export default AuthPage;
