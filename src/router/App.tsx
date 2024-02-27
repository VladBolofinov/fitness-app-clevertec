import {Route, Routes} from "react-router-dom";
import {Suspense, useEffect} from "react";
import {MyLoader} from "@pages/auth/Loader/MyLoader";
import {routeConfig} from "./routeConfig";
export const App = () => {
    useEffect(() => {
        return () => {
            sessionStorage.clear();
        };
    }, []);
return (
    <Suspense fallback={<MyLoader/>}>
        <Routes>
            {Object.values(routeConfig).map(({ path, element }, index) => (
                <Route key={index} path={path} element={element} />))}
        </Routes>
    </Suspense>
    )
}
