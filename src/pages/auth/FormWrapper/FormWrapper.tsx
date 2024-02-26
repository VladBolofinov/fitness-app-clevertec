import React from 'react';
import './FormWrapper.scss';
import {Grid, Tabs} from "antd";
import {MainLogoIconMd, MainLogoIconXl} from "@pages/main/components/customSvgIcons/customSvgIcons";
import {FormComponent} from "@pages/auth/FormComponent/FormComponent";
import {history} from "@redux/configure-store";
import {useLocation} from "react-router-dom";
const { useBreakpoint } = Grid;

export const FormWrapper:React.FC = () => {
    const screens = useBreakpoint();
    const location = useLocation();
    const redirectBetweenTabs = (key: string) => {
        (key === '1') ? history.push('/auth') : history.push('/auth/registration');
    }
    return (
        <div className="wrapper-entry-form">
            {(screens.xs) ? <MainLogoIconMd/> : <MainLogoIconXl/>}
            <div className="entry-form">
                <Tabs
                    defaultActiveKey={(location.pathname === '/auth') ? '1' : '2'}
                    onTabClick={(key) => redirectBetweenTabs(key)}
                    items={[
                        {
                            label: `Вход`,
                            key: '1',
                            children: <FormComponent type={'auth'}/>
                        },
                        {
                            label: `Регистрация`,
                            key: '2',
                            children: <FormComponent type={'registration'}/>
                        }
                    ]}
                />
            </div>
        </div>
    );
};
