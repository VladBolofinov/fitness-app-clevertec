import React from 'react';
import './AuthPage.scss';
import {MainLogoIconXl, MainLogoIconMd} from "@pages/main/components/customSvgIcons/customSvgIcons";
import {Tabs, Grid} from "antd";
import {FormComponent} from "@pages/auth/Form/FormComponent";
import {useLocation} from "react-router-dom";
import {history} from "@redux/configure-store";
const { useBreakpoint } = Grid;
export const AuthPage: React.FC = () => {
    const screens = useBreakpoint();
    const location = useLocation();
    const redirectBetweenTabs = (key: string) => {
        (key === '1') ? history.push('/auth') : history.push('/auth/registration');
    }
    return (
        <div className='auth-wrapper'>
            <button onClick={() => history.push('/result/error-change-password')}>go to error</button>
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
        </div>
    );
};
