import React from 'react';
import './FeedbackCard.scss';
import {Rate} from "antd";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import {FeedbackCardProps} from "@pages/feedback/components/feedbackCard/FeedbackCardPropsType";

export const FeedbackCard:React.FC<FeedbackCardProps> = ({item}) => {
    return (
        <div className='feedback-content-card' key={item.id}>
            <div className='avatar-wrapper'>
                <div className='img'>{item.imageSrc}</div>
                <span>{item.fullName}</span>
            </div>
            <div className='right-elems-wrapper'>
                <div className='rate-date-wrapper'>
                    <Rate
                        disabled={true}
                        value={item.rating}
                        className='feedback-card-rate'
                        character={({value, index}) => {
                            return value && index! < value ? <StarFilled/> : <StarOutlined/>
                        }}
                    />
                    <div className='feedback-date'>{item.createdAt}</div>
                </div>
                <p className='feedback-text'>{item.message}</p>
            </div>
        </div>
    );
};
