import './CommonPage.scss';
import '../../variables.scss';
import {Breadcrumb, Layout} from 'antd';
import React from 'react';
import {SiderContent} from "@pages/main/components/SiderContent/SiderContent";
import {TriggerBtn} from "@pages/main/components/triggerBtn/TriggerBtn";
import {useSelector} from "react-redux";
import {
    getIsCollapseSider
} from "@redux/selectors/getApiRequestState/getIsCollapseSider/getIsCollapseSider";

const { Header, Content } = Layout;
export const CommonPage = ({children, hasHeaderContent}) => {
    const isCollapseSider = useSelector(getIsCollapseSider);
    /*useEffect(() => {
        const hasTokenLocalSt: string | null = localStorage.getItem('jwtToken');
        const hasTokenSessionSt: string | null = sessionStorage.getItem('jwtToken');
        if (!hasTokenSessionSt && !hasTokenLocalSt) {
            history.push(RoutePath["/auth"]);
        }
    }, []);*/
    return (
        <Layout>
            <SiderContent collapsed={isCollapseSider}/>
            <Layout className='centerContentWrapper'>
                <Header className={`${isCollapseSider ? 'collapsed-style-header' : ''} ${hasHeaderContent ? 'header-with-content' : 'header-without-content'}`}>
                    <Breadcrumb>
                        <Breadcrumb.Item>Главная</Breadcrumb.Item>
                    </Breadcrumb>
                    {children.header}
                </Header>
                <Content >
                    {children.modal}
                    <TriggerBtn/>
                    {children.middle}
                    {children.footer}
                </Content>
            </Layout>
        </Layout>
    );
};
