import React from "react";
import "./FormWrapper.scss";
import {Tabs} from "antd";
import {MainLogoIconMd, MainLogoIconXl} from "@pages/main/components/customSvgIcons/customSvgIcons";
import {FormComponent} from "@pages/auth/FormComponent/FormComponent";
import {history} from "@redux/configure-store";
import {useLocation} from "react-router-dom";
import {AppRoutes} from "../../../router/routeConfig";

export const FormWrapper:React.FC = () => {
    const location = useLocation();
    const redirectBetweenTabs = (key: string) => {
        (key === "1") ? history.push(AppRoutes.AUTH) : history.push(AppRoutes.REGISTRATION);
    }
    return (
        <div className="wrapper-entry-form">
            <span className="logo-md"><MainLogoIconMd/></span>
            <span className="logo-xl"><MainLogoIconXl/></span>
            <div className="entry-form">
                <Tabs
                    defaultActiveKey={(location.pathname === AppRoutes.AUTH) ? "1" : "2"}
                    onTabClick={(key) => redirectBetweenTabs(key)}
                    items={[
                        {
                            label: "Вход",
                            key: "1",
                            children: <FormComponent type="auth"/>
                        },
                        {
                            label: "Регистрация",
                            key: "2",
                            children: <FormComponent type="registration"/>
                        }
                    ]}
                />
            </div>
        </div>
    );
};
