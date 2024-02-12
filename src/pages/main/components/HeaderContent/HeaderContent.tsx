import './HeaderContent.scss';
import {Breadcrumb, Button, Typography} from "antd";
import { SettingOutlined} from "@ant-design/icons";
import React from "react";
const { Title} = Typography;
export const HeaderContent = () => {
    return (
        //настрой потом breadcrumb под react-router
        <>
            <Breadcrumb>
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
            </Breadcrumb>
                <Typography className='header-wrapper'>
                    <Title className='main-header-text' level={1}>Приветствуем тебя в CleverFit— приложении,
                        <br/>которое поможет тебе добиться своей мечты!</Title>
                    <Button icon={<SettingOutlined />} type={"text"}>Настройки</Button>
                </Typography>
        </>
    );
};
