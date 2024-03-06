import './HeaderContent.scss';
import { Button, Grid, Typography} from "antd";
import { SettingOutlined} from "@ant-design/icons";
import React from "react";
const { Title} = Typography;
const { useBreakpoint } = Grid;
export const HeaderContent: React.FC = () => {
    const screens = useBreakpoint();
    return (
        <>
            <Typography className='header-wrapper'>
                <Title className='main-header-text' level={1}>Приветствуем тебя в CleverFit— приложении,
                    <br/>которое поможет тебе добиться своей мечты!</Title>
                {(screens.xs)
                    ? <Button shape={"circle"} icon={<SettingOutlined />}/>
                    : <Button icon={(!screens.lg) ? false :<SettingOutlined />} type={"text"}>Настройки</Button>}
            </Typography>
        </>
    );
};
