import React, {useEffect, useMemo} from 'react';
import './FeedbackContent.scss';
import {Button, Input, Modal, Rate, Result} from "antd";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {useSelector} from "react-redux";
import {getFeedbackData} from "@redux/selectors/getApiRequestState/getFeedbackData/getFeedbackData";
import {FeedbackCard} from "@pages/feedback/components/feedbackCard/FeedbackCard";
import {getIsCollapseFeedback} from "@redux/selectors/getApiRequestState/getIsCollapseFeedback/getIsCollapseFeedback";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {apiRequestSlice, sendFeedback} from "@redux/reducers/apiRequestSlice";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import {getRateScore} from "@redux/selectors/getApiRequestState/getRateScore/getRateScore";
import {getToken} from "@redux/selectors/getApiRequestState/getToken/getToken";
import {
    getFeedbackMessage
} from "@redux/selectors/getApiRequestState/getFeedbackMessage/getFeedbackMessage";
import {getIsOpenModal} from "@redux/selectors/getApiRequestState/getIsOpenModal/getIsOpenModal";
import {
    getIsSuccessRequest
} from "@redux/selectors/getApiRequestState/getIsSuccessRequest/getIsSuccessRequest";
const { TextArea } = Input;



export const FeedbackContent:React.FC = () => {
    const feedbackData = useSelector(getFeedbackData);
    const isCollapseFeedback  = useSelector(getIsCollapseFeedback);
    const rateScore  = useSelector(getRateScore);
    const token = useSelector(getToken);
    const isSuccessRequest = useSelector(getIsSuccessRequest);
    const feedbackMessage = useSelector(getFeedbackMessage);
    const isOpenModal = useSelector(getIsOpenModal);
    const {setIsCollapseFeedback, setRateScore, setFeedbackMessage, setIsOpenModal} = apiRequestSlice.actions;
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();
    const showModal = () => {
        dispatch(setIsOpenModal(true));
    };
    const closeModal = () => {
        dispatch(setIsOpenModal(false));
    };
    const handleCancel = () => {
        dispatch(setIsOpenModal(false));
        dispatch(sendFeedback({token,message: feedbackMessage , rating: rateScore}))
    };

    const renderFeedbackElems = useMemo(() => {
        const feedbackSlice = isCollapseFeedback ? feedbackData : feedbackData.slice(feedbackData.length-4, feedbackData.length); //поменяй на последние 4 элемента а не первые
        return feedbackSlice.map((item) => <FeedbackCard item={item} />);
    }, [feedbackData, isCollapseFeedback]);

    const errorModal = () => {
        Modal.confirm({
            icon: null,
            centered: true,
            title: '',
            cancelText: 'Написать отзыв',
            //onCancel: () => showModal(),
            cancelButtonProps: {block: true, type: "primary"},
            okText: 'Закрыть',
            okButtonProps: {block:true, type: "default"},
            maskStyle: { backgroundColor: 'rgba(121, 156, 213, 0.5)', backdropFilter: 'blur(5px)' },
            width: 539,
            content: <><Result
                status='error'
                title="Данные не сохранились"
                subTitle="Что-то пошло не так. Попробуйте еще раз."
            /></>
        });
    };
    const warningModal = () => {
        Modal.success({
            icon: null,
            centered: true,
            title: '',
            okText: 'Отлично',
            okButtonProps: {block:true},
            maskStyle: { backgroundColor: 'rgba(121, 156, 213, 0.5)', backdropFilter: 'blur(5px)' },
            width: 539,
            content: <><Result
                status='success'
                title="Отзыв успешно опубликован"
            /></>
        });
    };

    const errorHTTPModal = () => {
        Modal.error({
            icon: null,
            centered: true,
            title: '',
            okText: 'Назад',
            okButtonProps: {block:false},
            maskStyle: { backgroundColor: 'rgba(121, 156, 213, 0.5)', backdropFilter: 'blur(5px)' },
            width: 539,
            bodyStyle: {padding: '64px 32px 56px 32px'},
            content: <><Result
                status='500'
                title="Что-то пошло не так"
                subTitle="Произошла ошибка.Попробуйте еще раз."
            /></>
        });
    };
    useEffect(() => {
        //errorModal();
    },[isSuccessRequest])

    return (
        <div className='feedback-content-wrapper'>
            <div className='feedback-cards-wrapper'>
                {renderFeedbackElems}
                <Modal title="Ваш отзыв" open={isOpenModal} centered onCancel={closeModal}
                       maskStyle={{ backgroundColor: 'rgba(121, 156, 213, 0.5)', backdropFilter: 'blur(5px)' }}
                       footer={[
                           <Button key="submit" type="primary" block={(screens.xs && true)}
                                   onClick={handleCancel}
                                   data-test-id='new-review-submit-button'
                                   disabled={(rateScore) ? false : true}>
                               Опубликовать
                           </Button>
                       ]}>
                    <Rate
                        disabled={false}
                        className='modal-rate'
                        value={rateScore}
                        onChange={(value)=>dispatch(setRateScore(value))}
                        character={({value, index}) => {
                            return value && index! < value ? <StarFilled/> : <StarOutlined/>
                        }}
                    />
                    {/*разберись как добавить ползунок*/}
                    <TextArea rows={2} placeholder='Autosize height based on content lines'
                              onChange={(e)=>dispatch(setFeedbackMessage(e.currentTarget.value))} value={feedbackMessage} />
                </Modal>

                <Button onClick={warningModal}>Warning</Button>
                <Button onClick={errorModal}>Error</Button>
                <Button onClick={errorHTTPModal}>ErrorHTTP</Button>


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
