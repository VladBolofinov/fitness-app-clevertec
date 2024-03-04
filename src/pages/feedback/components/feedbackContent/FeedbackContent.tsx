import React, {useMemo, useState} from 'react';
import './FeedbackContent.scss';
import {Button, Input, Modal, Rate} from "antd";
import {StarFilled, StarOutlined, UserOutlined} from "@ant-design/icons";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {useSelector} from "react-redux";
import {getFeedbackData} from "@redux/selectors/getApiRequestState/getFeedbackData/getFeedbackData";
import avatar from '../../../../assets/img/avatar.png';
const { TextArea } = Input;
export const FeedbackContent:React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const feedbackData = useSelector(getFeedbackData);
    const screens = useBreakpoint();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const renderLastReviews = useMemo(() => (
        feedbackData.slice(0,4).map((item) => (
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
        ))
    ), [feedbackData]);
    return (
        <div className='feedback-content-wrapper'>
            <div className='feedback-cards-wrapper'>
                {renderLastReviews}
                <Modal title="Ваш отзыв" open={isModalOpen} centered onCancel={handleCancel}
                       maskStyle={{ backgroundColor: 'rgba(121, 156, 213, 0.5)', backdropFilter: 'blur(5px)' }}
                       footer={[
                           <Button key="submit" type="primary" block={(screens.xs && true)} onClick={handleCancel} >
                               Опубликовать
                           </Button>
                       ]}>
                    <Rate></Rate>
                    <TextArea rows={2} placeholder='Autosize height based on content lines' />
                </Modal>
            </div>
            <div>
                <Button type="primary" onClick={showModal}>
                    Написать отзыв
                </Button>
                <Button type={"link"}>Свернуть все отзывы</Button>
            </div>
        </div>
    );
};
