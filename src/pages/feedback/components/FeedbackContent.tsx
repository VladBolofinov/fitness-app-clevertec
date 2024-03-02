import React from 'react';
import './FeedbackContent.scss';
import {Rate} from "antd";
import {StarFilled, StarOutlined} from "@ant-design/icons";
export const FeedbackContent:React.FC = () => {
    return (
        <div className='feedback-content-wrapper'>
            <div className='feedback-content-card'>
                <div className='avatar-wrapper'>
                    <div className='img'></div>
                    <span>Vladislav Bolofinov</span>
                </div>
                <Rate
                    disabled={false}
                    value={3}
                    className='feedback-card-rate'
                    //character={<StarOutlined/>}
                    /*character={({value, index}) => {
                        return value && index! < value ? <StarFilled/> : <StarOutlined/>
                    }}*/
                />
            </div>

            <div className='feedback-content-card'>Карточка отзыва</div>
            <div className='feedback-content-card'>Карточка отзыва</div>
            <div className='feedback-content-card'>Карточка отзыва</div>
            <div>ОСТАВЬТЕ СВОЙ ОТЗЫВ ПЕРВЫМ</div>
        </div>
    );
};
