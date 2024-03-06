import "./SiderContent.scss";
import {MainLogoIconLg, MainLogoIconSm, MainLogoShortIcon, RollbackIcon} from "@pages/main/components/customSvgIcons/customSvgIcons";
import {Grid, Menu, Layout} from "antd";
import {CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled} from "@ant-design/icons";
import {IMainPageComponentsProps} from "@pages/main/components/types/IMainPageComponentsProps";
import React from "react";
const { Sider } = Layout;
const { useBreakpoint } = Grid;
import {history} from "@redux/configure-store";
import {AppRoutes} from "../../../../router/routeConfig";

export const SiderContent: React.FC<IMainPageComponentsProps> = ({collapsed}) => {
    const screens = useBreakpoint();
    const commonMenuItemStyle = screens.xs ? { paddingLeft: "4px" } : { padding: "0 16px" };
    const menuItems = [
        { key: "1", label: "Календарь", icon: screens.xs ? null : <CalendarTwoTone twoToneColor="var(--primary-light-9)" />, style: commonMenuItemStyle },
        { key: "2", label: "Тренировки", icon: screens.xs ? null : <HeartFilled style={{ color: "var(--primary-light-9)" }} />, style: commonMenuItemStyle },
        { key: "3", label: "Достижения", icon: screens.xs ? null : <TrophyFilled style={{ color: "var(--primary-light-9)" }} />, style: commonMenuItemStyle },
        { key: "4", label: "Профиль", icon: screens.xs ? null : <IdcardOutlined style={{ color: "var(--primary-light-9)" }} />, style: commonMenuItemStyle },
        { key: "5", label: "Выход", icon: screens.xs ? null : <RollbackIcon />, style: commonMenuItemStyle }
    ];

    return (
        <>
        {<Sider theme={"light"} width={screens.xs ? 106 : 208} trigger={null} collapsible collapsed={collapsed}
                     breakpoint={screens.xs ? "xs" : undefined} collapsedWidth={screens.xs ? 0 : undefined}>
                {screens.xs && <MainLogoIconSm style={{ margin: "16px 0 32px 0", display: "flex", justifyContent: "center" }} />}
                {!screens.xs && (collapsed ? <MainLogoShortIcon style={{ margin: "49px 0 50px 0px", display: "flex", justifyContent: "center" }} />
                    : <MainLogoIconLg style={{ margin: "44px 0 50px 29px" }}/>)}
                <Menu
                    theme="light"
                    mode="inline"
                    items={[...menuItems]}
                    onClick={(item) => {
                        if (item.key === "5") {
                            sessionStorage.clear();
                            localStorage.clear();
                            history.push(AppRoutes.AUTH);
                    }}}
                />
            </Sider>}
        </>
    );
};
