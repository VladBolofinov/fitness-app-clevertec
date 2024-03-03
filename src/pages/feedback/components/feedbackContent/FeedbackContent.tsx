import React, {useState} from 'react';
import './FeedbackContent.scss';
import {Button, Input, Modal, Rate} from "antd";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
const { TextArea } = Input;
export const FeedbackContent:React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const screens = useBreakpoint();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className='feedback-content-wrapper'>
            <div className='feedback-cards-wrapper'>
                <div className='feedback-content-card'>
                    <div className='avatar-wrapper'>
                        <div className='img'></div>
                        <span>Vladislav Bolofinov</span>
                    </div>
                    <div className='right-elems-wrapper'>
                        <div className='rate-date-wrapper'>
                            <Rate
                                disabled={false}
                                className='feedback-card-rate'
                                character={({value, index}) => {
                                    return value && index! < value ? <StarFilled/> : <StarOutlined/>
                                }}
                            />
                            <div className='feedback-date'>24.11.24</div>
                        </div>
                        <p className='feedback-text'>asdasdasdasdadasdasdasdasdasdsadas</p>
                    </div>
                </div>


                <div className='feedback-content-card'>Карточка отзыва</div>
                <div className='feedback-content-card'>Карточка отзыва</div>
                <div className='feedback-content-card'>Карточка отзыва</div>
                <div className='feedback-content-card'>Карточка отзыва</div>
                <div className='feedback-content-card'>Карточка отзыва</div>
                <div className='feedback-content-card'>Карточка отзыва</div>
                <div className='feedback-content-card'>Карточка отзыва</div>
                <div className='feedback-content-card'>Карточка отзыва</div>
                <div className='feedback-content-card'>Карточка отзыва</div>
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
