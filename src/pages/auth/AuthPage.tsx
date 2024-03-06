import React, {ReactNode} from "react";
import "./AuthPage.scss";

const AuthPage: React.FC<ReactNode> = ({children}) => (
        <div className="auth-wrapper">{children}</div>
    );
export default AuthPage;
