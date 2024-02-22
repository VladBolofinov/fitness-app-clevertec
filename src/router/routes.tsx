import {Navigate, Route, Routes} from "react-router-dom";
import {MainPage} from "@pages/main/MainPage";
import {AuthPage} from "@pages/auth/AuthPage";
import {ResultPage} from "@pages/result/ResultPage";
import {useEffect} from "react";
import {RequireAuth} from "./hoc/RequireAuth";
import {FormWrapper} from "@pages/auth/FormWrapper/FormWrapper";
import {ResultMessage} from "@pages/auth/ResultMessage/ResultMessage";
import {useAppSelector} from "@hooks/typed-react-redux-hooks";

export const RoutesComponent = () => {
    //сделай потом типизацию через enum
    const {isErrorStatus, isRegistrationSuccess} = useAppSelector(state => state.apiRequestSlice);
    useEffect(() => {
        return () => {
            sessionStorage.clear();
        };
    }, []);
return (
    <Routes>
        <Route path={'/'} element={<RequireAuth><MainPage /></RequireAuth>}/>
        <Route path={'/main'} element={<RequireAuth><MainPage /></RequireAuth>}/>
        <Route path={'/auth'} element={<RequireAuth><AuthPage><FormWrapper/></AuthPage></RequireAuth>}/>
        <Route path={'/auth/registration'} element={<RequireAuth><AuthPage><FormWrapper/></AuthPage> </RequireAuth>}/>
        <Route path={'/result/error-login'} element={(isErrorStatus) ? <AuthPage><ResultMessage type={'error-login'}/></AuthPage> : <Navigate to="/auth" />} />
        <Route path={'/result/success'} element={(isRegistrationSuccess) ? <AuthPage><ResultMessage type={'success'}/></AuthPage> : <Navigate to="/auth" />}/>
        <Route path={'/result/error-user-exist'} element={(isErrorStatus) ? <AuthPage><ResultMessage type={'error-user-exist'}/></AuthPage> : <Navigate to="/auth" />}/>
        <Route path={'/result/error'} element={(isErrorStatus) ? <AuthPage><ResultMessage type={'error'}/></AuthPage> : <Navigate to="/auth" />}/>

        <Route path={'/result/error-check-email-no-exist'} element={(isErrorStatus) ? <ResultPage /> : <Navigate to="/auth" />}/>
        <Route path={'/result/error-check-email'} element={(isErrorStatus) ? <ResultPage /> :<Navigate to="/auth" />}/>
        <Route path={'/result/error-change-password'} element={(isErrorStatus) ? <ResultPage /> :<Navigate to="/auth" />}/>
        <Route path={'/result/success-change-password'} element={(isErrorStatus) ? <ResultPage /> :<Navigate to="/auth" />}/>

        {/*<Route path="*" element={<Navigate to="/" />} />*/}
    </Routes>
    )
}
