import 'antd/dist/antd.css';
import './MainPage.scss';
import '../../variables.css';
import { Layout, Grid} from 'antd';
import React, {useEffect, useState} from 'react';
import {BtnIconCollapsedLg,
    BtnIconNotCollapsedLg,
    BtnIconCollapsedSm,
    BtnIconNotCollapsedSm} from "@pages/main/components/customSvgIcons/customSvgIcons";
import {HeaderContent} from "@pages/main/components/HeaderContent/HeaderContent";
import {MiddleContent} from "@pages/main/components/MiddleContent/MiddleContent";
import {FooterContent} from "@pages/main/components/FooterContent/FooterContent";
import {SiderContent} from "@pages/main/components/SiderContent/SiderContent";
import {history} from "@redux/configure-store";

const { useBreakpoint } = Grid;
const { Header, Content } = Layout;

const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const screens = useBreakpoint();

    useEffect(() => {
        const hasTokenLocalSt: string | null = localStorage.getItem('jwtToken');
        const hasTokenSessionSt: string | null = sessionStorage.getItem('jwtToken');
        if (!hasTokenSessionSt && !hasTokenLocalSt) {
            history.push('/auth');
        }
    }, []);

    return (
        <Layout className='mainWrapper'>
            <SiderContent collapsed={collapsed}/>
            <Layout className='centerContentWrapper'>
                <Header className={(collapsed) ? 'collapsed-style-header' : ''}>
                    <HeaderContent/>
                </Header>
                <Content >
                    <button
                        data-test-id={screens.xs ? 'sider-switch-mobile' : 'sider-switch'}
                        className={collapsed ? 'btn-trigger-collapsed' : 'btn-trigger'}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {screens.xs ? (
                            collapsed ? <BtnIconNotCollapsedSm /> : <BtnIconCollapsedSm />
                        ) : (
                            collapsed ? <BtnIconNotCollapsedLg /> : <BtnIconCollapsedLg />
                        )}
                    </button>
                    <MiddleContent collapsed={collapsed} />
                    <FooterContent collapsed={collapsed} />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainPage;
