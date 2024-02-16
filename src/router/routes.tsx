import {Navigate, Route, Routes} from "react-router-dom";
import {MainPage} from "@pages/main/MainPage";
import {AuthPage} from "@pages/auth/AuthPage";
import {ResultPage} from "@pages/result/ResultPage";

export const RoutesComponent = () => {
    //сделай потом типизацию через enum
    //посмотри стили потом именно медиазапросы какая-то ерунда
    const hasToken: string | null = localStorage.getItem('jwtToken');
return (
    <Routes>
        <Route path={'/main'} element={(hasToken) ? <MainPage /> : <Navigate to="/auth" />} />
        <Route path={'/auth'} element={(hasToken) ? <Navigate to="/main" /> : <AuthPage />} />
        <Route path={'/result'} element={<ResultPage />}/>
        {/*<Route path="*" element={<Navigate to="/" />} />*/}
    </Routes>
    )
}
