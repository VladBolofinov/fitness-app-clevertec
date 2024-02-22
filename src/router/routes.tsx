import {Navigate, Route, Routes} from "react-router-dom";
import {MainPage} from "@pages/main/MainPage";
import {AuthPage} from "@pages/auth/AuthPage";
import {ResultPage} from "@pages/result/ResultPage";
import {useEffect} from "react";
import {RequireAuth} from "./hoc/RequireAuth";
import {MyLoader} from "@pages/auth/Loader/MyLoader";
import {FormWrapper} from "@pages/auth/FormWrapper/FormWrapper";
import {ResultMessage} from "@pages/auth/ResultMessage/ResultMessage";

export const RoutesComponent = () => {
    //сделай потом типизацию через enum
    //посмотри стили потом именно медиазапросы какая-то ерунда
    useEffect(() => {
        return () => {
            sessionStorage.clear();
        };
    }, []);
return (
    <Routes>
        {/*сделай потом для Auth общую обертку, в секции Result общий background*/}
        <Route path={'/'} element={<RequireAuth><MainPage /></RequireAuth>}/>
        <Route path={'/main'} element={<RequireAuth><MainPage /></RequireAuth>}/>
        <Route path={'/auth'} element={<RequireAuth><AuthPage><FormWrapper/></AuthPage></RequireAuth>}/>
        <Route path={'/auth/registration'} element={<RequireAuth><AuthPage><FormWrapper/></AuthPage> </RequireAuth>}/>
        <Route path={'/result/error-login'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> : <AuthPage><ResultMessage/></AuthPage>)} />
        <Route path={'/result/error'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> : <AuthPage><ResultMessage/></AuthPage>)}/>
        <Route path={'/result/success'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> :<ResultPage />)}/>
        <Route path={'/result/error-user-exist'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> : <div> Пользователь уже существует</div>)}/>
        <Route path={'/result/error-check-email-no-exist'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> :<ResultPage />)}/>
        <Route path={'/result/error-check-email'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> :<ResultPage />)}/>
        <Route path={'/result/error-change-password'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> :<ResultPage />)}/>
        <Route path={'/result/success-change-password'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> :<ResultPage />)}/>
        <Route path={'/result/*'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> : <div>Error page</div>)}/>
        <Route path={'/loader'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> : <div><MyLoader/></div>)}/>
        {/*<Route path="*" element={<Navigate to="/" />} />*/}
    </Routes>
    )
}
