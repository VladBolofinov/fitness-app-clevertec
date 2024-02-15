import {Navigate, Route, Routes} from "react-router-dom";
import {MainPage} from "@pages/main/MainPage";
import {MiddleContent} from "@pages/main/components/MiddleContent/MiddleContent";

const auth = true;
export const routes = (
    //сделай потом типизацию через enum
<Routes>
    <Route path={'/'} element={(auth) ? <MainPage /> : <Navigate to="/auth" />} />
    <Route path={'/auth'} element={<MiddleContent/>} />
    {/*<Route path="*" element={<Navigate to="/" />} />*/}
</Routes>
);
