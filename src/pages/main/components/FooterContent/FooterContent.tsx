import './FooterContent.scss';
import {Button} from "antd";
import {
    AndroidFilled,
    AppleFilled,
    CalendarOutlined,
    HeartFilled,
    IdcardOutlined
} from "@ant-design/icons";
import { IMainPageComponentsProps } from "@pages/main/components/types/IMainPageComponentsProps";
import React from "react";
export const FooterContent: React.FC<IMainPageComponentsProps> = ({ collapsed }) => {
    const items = [
        { title: 'Расписать тренировки', icon: <HeartFilled />, buttonText: 'Настройки' },
        { title: 'Назначить календарь', icon: <CalendarOutlined />, buttonText: 'Календарь' },
        { title: 'Заполнить профиль', icon: <IdcardOutlined />, buttonText: 'Профиль' }
    ];
    return (
        <>
            <div className={`app-usage-item-wrapper ${collapsed ? 'collapsed' : ''}`}>
                {items.map((item, index) => (
                    <div key={index} className={`app-usage-item ${collapsed ? 'collapsed' : ''}`}>
                        <div className='item-title'>{item.title}</div>
                        <div className="item-btn-wrapper">
                            <Button icon={item.icon} type={"link"}>{item.buttonText}</Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`bottom-content-wrapper ${collapsed ? 'collapsed' : ''}`}>
                <Button type={"link"}>Смотреть отзывы</Button>
                <div className="download-section">
                    <div className="download-link-descr">
                        <Button type={"link"}>Скачать на телефон</Button>
                        <Button type={"text"}>Доступно в PRO-тарифе</Button>
                    </div>
                    <div className="os-links">
                        <Button icon={<AndroidFilled />} type={"text"}>Android OS</Button>
                        <Button icon={<AppleFilled />} type={"text"}>Apple OS</Button>
                    </div>
                </div>
            </div>
        </>
    );
};
