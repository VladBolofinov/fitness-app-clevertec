import {Navigate, Route, Routes} from "react-router-dom";
import {AuthPage} from "@pages/auth/AuthPage";
import { useEffect} from "react";
import {RequireAuth} from "./hoc/RequireAuth";
import {FormWrapper} from "@pages/auth/FormWrapper/FormWrapper";
import {ResultMessage} from "@pages/auth/ResultMessage/ResultMessage";
import {useAppSelector} from "@hooks/typed-react-redux-hooks";
import {ChangePassword} from "@pages/auth/ChangePassword/ChangePassword";
import {MainPage} from "@pages/main/MainPage";

export const RoutesComponent = () => {
    //сделай потом типизацию через enum
    const {isErrorStatus, isSuccessRequest} = useAppSelector(state => state.apiRequestSlice);
    useEffect(() => {
        return () => {
            sessionStorage.clear();
        };
    }, []);
return (

        <Routes>
            <Route path={'/'} element={<RequireAuth><MainPage/></RequireAuth>}/>
            <Route path={'/main'} element={<RequireAuth><MainPage/></RequireAuth>}/>
            <Route path={'/auth'} element={<RequireAuth><AuthPage><FormWrapper/></AuthPage></RequireAuth>}/>
            <Route path={'/auth/registration'} element={<RequireAuth><AuthPage><FormWrapper/></AuthPage> </RequireAuth>}/>
            <Route path={'/result/error-login'} element={(isErrorStatus) ? <AuthPage><ResultMessage type={'error-login'}/></AuthPage> : <Navigate to="/auth" />} />
            <Route path={'/result/success'} element={(isSuccessRequest) ? <AuthPage><ResultMessage type={'success'}/></AuthPage> : <Navigate to="/auth" />}/>
            <Route path={'/result/error-user-exist'} element={(isErrorStatus) ? <AuthPage><ResultMessage type={'error-user-exist'}/></AuthPage> : <Navigate to="/auth" />}/>
            <Route path={'/result/error'} element={(isErrorStatus) ? <AuthPage><ResultMessage type={'error'}/></AuthPage> : <Navigate to="/auth" />}/>
            <Route path={'/result/error-check-email-no-exist'} element={(isErrorStatus) ? <AuthPage><ResultMessage type={'error-check-email-no-exist'}/></AuthPage> : <Navigate to="/auth" />}/>
            <Route path={'/result/error-check-email'} element={(isErrorStatus) ? <AuthPage><ResultMessage type={'error-check-email'}/></AuthPage> :<Navigate to="/auth" />}/>
            <Route path={'/auth/confirm-email'} element={(isSuccessRequest) ? <AuthPage><ResultMessage type={'confirm-email'}/></AuthPage> :<Navigate to="/auth" />}/>
            <Route path={'/auth/change-password'} element={(isSuccessRequest) ? <AuthPage><ChangePassword/></AuthPage> : <Navigate to="/auth" />}/>
            <Route path={'/result/error-change-password'} element={(isErrorStatus) ? <AuthPage><ResultMessage type={'error-change-password'}/></AuthPage> :<Navigate to="/auth" />}/>
            <Route path={'/result/success-change-password'} element={(isErrorStatus) ? <AuthPage><ResultMessage type={'success-change-password'}/></AuthPage> :<Navigate to="/auth" />}/>
        </Routes>
    )
}
