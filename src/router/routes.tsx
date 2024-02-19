import {Navigate, Route, Routes} from "react-router-dom";
import {MainPage} from "@pages/main/MainPage";
import {AuthPage} from "@pages/auth/AuthPage";
import {ResultPage} from "@pages/result/ResultPage";
import {useEffect} from "react";
import {RequireAuth} from "./hoc/RequireAuth";

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
        <Route path={'/main'} element={<RequireAuth><MainPage /></RequireAuth>}/>
        <Route path={'/auth'} element={<RequireAuth><AuthPage/></RequireAuth>}/>
        <Route path={'/result/error'} element={<ResultPage />}/>
        {/*<Route path="*" element={<Navigate to="/" />} />*/}
    </Routes>
    )
}
