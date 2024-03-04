import React, {useMemo, useState} from 'react';
import './FeedbackContent.scss';
import {Button, Input, Modal, Rate} from "antd";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {useSelector} from "react-redux";
import {getFeedbackData} from "@redux/selectors/getApiRequestState/getFeedbackData/getFeedbackData";
import {FeedbackCard} from "@pages/feedback/components/feedbackCard/FeedbackCard";
import {
    getIsCollapseFeedback
} from "@redux/selectors/getApiRequestState/getIsCollapseFeedback/getIsCollapseFeedback";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {apiRequestSlice} from "@redux/reducers/apiRequestSlice";
const { TextArea } = Input;
export const FeedbackContent:React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const feedbackData = useSelector(getFeedbackData);
    const isCollapseFeedback  = useSelector(getIsCollapseFeedback);
    const {setIsCollapseFeedback} = apiRequestSlice.actions;
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const renderFeedbackElems = useMemo(() => {
        const feedbackSlice = isCollapseFeedback ? feedbackData : feedbackData.slice(0, 4);
        return feedbackSlice.map((item) => <FeedbackCard item={item} />);
    }, [feedbackData, isCollapseFeedback]);

    return (
        <div className='feedback-content-wrapper'>
            <div className='feedback-cards-wrapper'>
                {renderFeedbackElems}
                <Modal title="Ваш отзыв" open={isModalOpen} centered onCancel={handleCancel}
                       maskStyle={{ backgroundColor: 'rgba(121, 156, 213, 0.5)', backdropFilter: 'blur(5px)' }}
                       footer={[
                           <Button key="submit" type="primary" block={(screens.xs && true)}
                                   onClick={handleCancel}
                                   data-test-id='new-review-submit-button'>
                               Опубликовать
                           </Button>
                       ]}>
                    <Rate></Rate>
                    <TextArea rows={2} placeholder='Autosize height based on content lines' />
                </Modal>
            </div>
            <div>
                <Button type="primary" onClick={showModal}
                        data-test-id='write-review'>
                    Написать отзыв
                </Button>
                <Button type={"link"}
                        onClick={() => dispatch(setIsCollapseFeedback())}
                        data-test-id='all-reviews-button'>
                    {isCollapseFeedback ? 'Свернуть' : 'Развернуть'} все отзывы
                </Button>
            </div>
        </div>
    );
};
