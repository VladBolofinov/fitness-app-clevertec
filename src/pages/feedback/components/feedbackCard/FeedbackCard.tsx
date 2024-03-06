import React from "react";
import "./FeedbackCard.scss";
import {Rate} from "antd";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import {FeedbackCardProps} from "@pages/feedback/components/feedbackCard/FeedbackCardPropsType";
import avatar from "../../../../assets/img/avatar.png";

export const FeedbackCard:React.FC<FeedbackCardProps> = ({item}) => {
    const formatDate = (dateString:string) => {
        const date = new Date(dateString);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
    return (
        <div className="feedback-content-card" key={item.id}>
            <div className="avatar-wrapper">
                <img className="avatar-img" src={item.imageSrc || avatar} alt="soq"/>
                <span className="item-name">{item.fullName || "Пользователь"}</span>
            </div>
            <div className="right-elems-wrapper">
                <div className="rate-date-wrapper">
                    <Rate
                        disabled={true}
                        value={item.rating}
                        className="feedback-card-rate"
                        character={({value, index}) => value && index! < value ? <StarFilled/> : <StarOutlined/>}
                    />
                    <div className="feedback-date">{formatDate(item.createdAt)}</div>
                </div>
                <p className="feedback-text">{item.message}</p>
            </div>
        </div>
    );
};
