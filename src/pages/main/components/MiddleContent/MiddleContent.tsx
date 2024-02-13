import './MiddleContent.scss';
import {Button} from 'antd';
import Icon, {
    AndroidFilled, AppleFilled,
    CalendarOutlined,
    HeartFilled,
    IdcardOutlined,
} from '@ant-design/icons';
import React from "react";
export const MiddleContent = ({collapsed}) => {
    return (
        <>
            <div className={(collapsed) ? 'app-usage collapsed' : 'app-usage'}>
                С CleverFit ты сможешь:
                <br/>— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;
                <br/>— отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами;
                <br/>— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках;
                <br/>— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.
            </div>
            <div className={(collapsed) ? 'app-descr collapsed' : 'app-descr'}>
                CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
            </div>
            <div className={(collapsed) ? 'app-usage-item-wrapper collapsed' : 'app-usage-item-wrapper'}>
                <div className={(collapsed) ? 'app-usage-item collapsed' : 'app-usage-item'}>
                    <div className='item-title'>Расписать тренировки</div>
                    <div className="item-btn-wrapper">
                        <Button icon={<HeartFilled />} type={"link"}>Настройки</Button>
                    </div>
                </div>
                <div className={(collapsed) ? 'app-usage-item collapsed' : 'app-usage-item'}>
                    <div className='item-title'>Назначить календарь</div>
                    <div className="item-btn-wrapper">
                        <Button icon={<CalendarOutlined />} type={"link"}>Календарь</Button>
                    </div>
                </div>
                <div className={(collapsed) ? 'app-usage-item collapsed' : 'app-usage-item'}>
                    <div className='item-title'>Заполнить профиль</div>
                    <div className="item-btn-wrapper">
                        <Button icon={<IdcardOutlined />} type={"link"}>Профиль</Button>
                    </div>
                </div>
            </div>
            <div className={(collapsed) ? 'bottom-content-wrapper collapsed' : 'bottom-content-wrapper'}>
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
