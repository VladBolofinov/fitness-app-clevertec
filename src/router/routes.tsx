import {Navigate, Route, Routes} from "react-router-dom";
import {MainPage} from "@pages/main/MainPage";
import {AuthPage} from "@pages/auth/AuthPage";
import {ResultPage} from "@pages/result/ResultPage";
import {useEffect} from "react";
import {RequireAuth} from "./hoc/RequireAuth";
import {history} from "@redux/configure-store";

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
        <Route path={'/'} element={<RequireAuth><MainPage /></RequireAuth>}/>
        <Route path={'/auth'} element={<RequireAuth><AuthPage/></RequireAuth>}/>
        <Route path={'/auth/registration'} element={<RequireAuth><AuthPage/></RequireAuth>}/>
        <Route path={'/result/success'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> :<ResultPage />)}/>
        <Route path={'/result/error'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> :<ResultPage />)}/>
        <Route path={'/result/error-user-exist'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> : <div> Пользователь уже существует</div>)}/>
        <Route path={'/result/error-login'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> :<>
            <div>Вход не выполнен!!! Что-то пошло не так</div>
            <button onClick={() => history.push('/auth')}>Повторить</button>
        </>)} />
        <Route path={'/result/error-check-email-no-exist'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> :<ResultPage />)}/>
        <Route path={'/result/error-check-email'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> :<ResultPage />)}/>
        <Route path={'/result/error-change-password'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> :<ResultPage />)}/>
        <Route path={'/result/success-change-password'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> :<ResultPage />)}/>
        <Route path={'/result/*'} element={(location.pathname.startsWith('/result') ? <Navigate to="/auth" /> : <div>Error page</div>)}/>
        {/*<Route path="*" element={<Navigate to="/" />} />*/}
    </Routes>
    )
}
