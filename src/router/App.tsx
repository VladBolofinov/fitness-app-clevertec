import {Navigate, Route, Routes} from "react-router-dom";
import {Suspense, useEffect} from "react";
import {MyLoader} from "@pages/auth/Loader/MyLoader";
import {AppRoutes, routeConfig} from "./routeConfig";
import {useAppSelector} from "@hooks/typed-react-redux-hooks";
import {useSelector} from "react-redux";
import {getLocation} from "@redux/selectors/getRouterState/getLocation/getLocation";
import {history} from "@redux/configure-store";
export const App = () => {
    const {isErrorStatus, isSuccessRequest} = useAppSelector(state => state.apiRequestSlice);
    const location = useSelector(getLocation);
    useEffect(() => {
        if (location.search) {
            const prefix = '?accessToken=';
            const token = (location.search.startsWith(prefix)) && location.search.substring(prefix.length);
            if (token) {
                localStorage.setItem('jwtToken', token);
                history.push(AppRoutes.MAIN);
            }
        }
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
