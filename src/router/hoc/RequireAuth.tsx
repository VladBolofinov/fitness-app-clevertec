import { useLocation, Navigate } from 'react-router-dom';
import {AppRoutes} from "../routeConfig";
import React from "react";
export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const hasTokenLocalSt: string | null = localStorage.getItem('jwtToken');
    const hasTokenSessionSt: string | null = sessionStorage.getItem('jwtToken');
    const location = useLocation();

    if ((location.pathname === AppRoutes.ROOT) && (hasTokenLocalSt || hasTokenSessionSt)) {
        return <Navigate to={AppRoutes.MAIN}/>
    }

    if ((location.pathname === AppRoutes.MAIN || location.pathname === AppRoutes.ROOT || location.pathname === AppRoutes.FEEDBACK)
        && !(hasTokenLocalSt || hasTokenSessionSt)) {
        return <Navigate to={AppRoutes.AUTH} />
    }

    if ((location.pathname === AppRoutes.AUTH || location.pathname === AppRoutes.REGISTRATION) && (hasTokenLocalSt || hasTokenSessionSt)) {
        return <Navigate to={AppRoutes.MAIN} />
    }

    return <>{children}</>;
};
