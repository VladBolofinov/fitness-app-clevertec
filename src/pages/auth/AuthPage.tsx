import React from "react";
import "./AuthPage.scss";
import {AuthPagePropsType} from "@pages/auth/types/AuthPagePropsType";

const AuthPage: React.FC<AuthPagePropsType> = ({children}) => (
        <div className="auth-wrapper">{children}</div>
    );
export default AuthPage;
