import React from 'react';
import './AuthPage.scss';
import {MainLogoIconXl, MainLogoIconMd} from "@pages/main/components/customSvgIcons/customSvgIcons";
import {Tabs, Grid} from "antd";
import {FormComponent} from "@pages/auth/FormComponent/FormComponent";
import {useLocation} from "react-router-dom";
import {history} from "@redux/configure-store";
import {MyLoader} from "@pages/auth/Loader/MyLoader";
import {useAppSelector} from "@hooks/typed-react-redux-hooks";
const { useBreakpoint } = Grid;
export const AuthPage: React.FC = () => {
    const screens = useBreakpoint();
    const location = useLocation();
    const {isLoadingRequest} = useAppSelector(state => state.apiRequestSlice);
    const redirectBetweenTabs = (key: string) => {
        (key === '1') ? history.push('/auth') : history.push('/auth/registration');
    }
    return (
        <div className='auth-wrapper'>
            {(isLoadingRequest) ? <MyLoader/> : null}
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
