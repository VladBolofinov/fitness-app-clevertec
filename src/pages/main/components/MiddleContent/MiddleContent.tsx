import './MiddleContent.scss';
import { IMainPageComponentsProps } from "@pages/main/components/types/IMainPageComponentsProps";
import React from "react";
export const MiddleContent:React.FC<IMainPageComponentsProps> = ({collapsed}) => (
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
        </>
    );
