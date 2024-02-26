import {Navigate, Route, Routes} from "react-router-dom";
import {Suspense, useEffect} from "react";
import {RequireAuth} from "./hoc/RequireAuth";
import {FormWrapper} from "@pages/auth/FormWrapper/FormWrapper";
import {ResultMessage} from "@pages/auth/ResultMessage/ResultMessage";
import {useAppSelector} from "@hooks/typed-react-redux-hooks";
import {ChangePassword} from "@pages/auth/ChangePassword/ChangePassword";
import {MyLoader} from "@pages/auth/Loader/MyLoader";
import {MainPageAsync} from "@pages/main/MainPage.async";
import {AuthPageAsync} from "@pages/auth/AuthPage.async";

export const App = () => {
    //сделай потом типизацию через enum
    const {isErrorStatus, isSuccessRequest} = useAppSelector(state => state.apiRequestSlice);
    useEffect(() => {
        return () => {
            sessionStorage.clear();
        };
    }, []);
return (
    <Suspense fallback={<MyLoader/>}>
        <Routes>
            <Route path={'/'} element={<RequireAuth><MainPageAsync/></RequireAuth>}/>
            <Route path={'/main'} element={<RequireAuth><MainPageAsync/></RequireAuth>}/>
            <Route path={'/auth'} element={<RequireAuth><AuthPageAsync><FormWrapper/></AuthPageAsync></RequireAuth>}/>
            <Route path={'/auth/registration'} element={<RequireAuth><AuthPageAsync><FormWrapper/></AuthPageAsync> </RequireAuth>}/>
            <Route path={'/result/error-login'} element={(isErrorStatus) ? <AuthPageAsync><ResultMessage type={'error-login'}/></AuthPageAsync> : <Navigate to="/auth" />} />
            <Route path={'/result/success'} element={(isSuccessRequest) ? <AuthPageAsync><ResultMessage type={'success'}/></AuthPageAsync> : <Navigate to="/auth" />}/>
            <Route path={'/result/error-user-exist'} element={(isErrorStatus) ? <AuthPageAsync><ResultMessage type={'error-user-exist'}/></AuthPageAsync> : <Navigate to="/auth" />}/>
            <Route path={'/result/error'} element={(isErrorStatus) ? <AuthPageAsync><ResultMessage type={'error'}/></AuthPageAsync> : <Navigate to="/auth" />}/>
            <Route path={'/result/error-check-email-no-exist'} element={(isErrorStatus) ? <AuthPageAsync><ResultMessage type={'error-check-email-no-exist'}/></AuthPageAsync> : <Navigate to="/auth" />}/>
            <Route path={'/result/error-check-email'} element={(isErrorStatus) ? <AuthPageAsync><ResultMessage type={'error-check-email'}/></AuthPageAsync> :<Navigate to="/auth" />}/>
            <Route path={'/auth/confirm-email'} element={(isSuccessRequest) ? <AuthPageAsync><ResultMessage type={'confirm-email'}/></AuthPageAsync> :<Navigate to="/auth" />}/>
            <Route path={'/auth/change-password'} element={(isSuccessRequest) ? <AuthPageAsync><ChangePassword/></AuthPageAsync> : <Navigate to="/auth" />}/>
            <Route path={'/result/error-change-password'} element={(isErrorStatus) ? <AuthPageAsync><ResultMessage type={'error-change-password'}/></AuthPageAsync> :<Navigate to="/auth" />}/>
            <Route path={'/result/success-change-password'} element={(isErrorStatus) ? <AuthPageAsync><ResultMessage type={'success-change-password'}/></AuthPageAsync> :<Navigate to="/auth" />}/>
        </Routes>
    </Suspense>
    )
}
