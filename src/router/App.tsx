import {Navigate, Route, Routes} from "react-router-dom";
import React, {Suspense, useEffect} from "react";
import {MyLoader} from "@pages/auth/Loader/MyLoader";
import {AppRoutes, routeConfig} from "./routeConfig";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks";
import {useSelector} from "react-redux";
import {getLocation} from "@redux/selectors/getRouterState/getLocation/getLocation";
import {history} from "@redux/configure-store";
import {apiRequestSlice} from "@redux/reducers/apiRequestSlice";
import {
    getIsLoadingRequest
} from "@redux/selectors/getApiRequestState/getIsLoadingRequest/getIsLoadingRequest";
export const App:React.FC = () => {
    const {isErrorStatus, isSuccessRequest} = useAppSelector(state => state.apiRequestSlice);
    const location = useSelector(getLocation);
    const dispatch = useAppDispatch();
    const {saveTokenAtStore} = apiRequestSlice.actions;
    useEffect(() => {
        if (location.search) {
            const prefix = '?accessToken=';
            const token = (location.search.startsWith(prefix)) && location.search.substring(prefix.length);
            if (token) {
                localStorage.setItem('jwtToken', token);
                dispatch(saveTokenAtStore(token));
                history.push(AppRoutes.MAIN);
            }
        } else {
            // добавь тут проверку на локацию чтобы на auth не сохраняло токен
            const jwt = localStorage.getItem('jwtToken');
            dispatch(saveTokenAtStore(jwt));
        }
        return () => {
            sessionStorage.clear();
        };
    }, []);
    const isLoadingRequest = useSelector(getIsLoadingRequest);
return (
    <Suspense fallback={<MyLoader/>}>
        {(isLoadingRequest) ? <MyLoader/> : null}
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
