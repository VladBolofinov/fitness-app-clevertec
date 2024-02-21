import React from 'react';
import './AuthPage.scss';
import {MainLogoIconXl, MainLogoIconMd} from "@pages/main/components/customSvgIcons/customSvgIcons";
import {Tabs, Grid} from "antd";
import {FormComponent} from "@pages/auth/Form/FormComponent";
const { useBreakpoint } = Grid;
export const AuthPage: React.FC = () => {
    const screens = useBreakpoint();
    return (
        <div className='auth-wrapper'>
            <div className="wrapper-entry-form">
                {(screens.xs) ? <MainLogoIconMd/> : <MainLogoIconXl/>}
                <div className="entry-form">
                    <Tabs
                        defaultActiveKey="1"
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
