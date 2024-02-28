import {Navigate, Route, Routes} from "react-router-dom";
import {Suspense, useEffect} from "react";
import {MyLoader} from "@pages/auth/Loader/MyLoader";
import {AppRoutes, routeConfig} from "./routeConfig";
import {useAppSelector} from "@hooks/typed-react-redux-hooks";
export const App = () => {
    const {isErrorStatus, isSuccessRequest} = useAppSelector(state => state.apiRequestSlice);
    useEffect(() => {
        return () => {
            sessionStorage.clear();
        };
    }, []);
return (
    <Suspense fallback={<MyLoader/>}>
        <Routes>
            {Object.values(routeConfig).map(({ path, element, id }, index) => {
                if (id === 'error') {
                    return <Route key={index} path={path} element={(isErrorStatus) ? element : <Navigate to={AppRoutes.AUTH} />} />;
                } else if (id === 'success') {
                    return <Route key={index} path={path} element={(isSuccessRequest) ? element : <Navigate to={AppRoutes.AUTH} />} />;
                }
                return <Route key={index} path={path} element={element} />;
            })}
        </Routes>
    </Suspense>
    )
}
