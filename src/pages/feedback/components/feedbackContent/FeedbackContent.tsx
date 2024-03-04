import React, {useEffect, useMemo} from 'react';
import './FeedbackContent.scss';
import {Button, Modal, Result} from "antd";
import {useSelector} from "react-redux";
import {getFeedbackData} from "@redux/selectors/getApiRequestState/getFeedbackData/getFeedbackData";
import {FeedbackCard} from "@pages/feedback/components/feedbackCard/FeedbackCard";
import {getIsCollapseFeedback} from "@redux/selectors/getApiRequestState/getIsCollapseFeedback/getIsCollapseFeedback";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {apiRequestSlice, getFeedbacks} from "@redux/reducers/apiRequestSlice";
import {getToken} from "@redux/selectors/getApiRequestState/getToken/getToken";
import {getIsSuccessSendFeedback} from "@redux/selectors/getApiRequestState/getIsSuccessSendFeedback/getIsSuccessSendFeedback";
import {ModalFeedbackForm} from "@pages/feedback/components/modalFeedbackForm/ModalFeedbackForm";
import {NotFindFeedbacks} from "@pages/feedback/components/notFindFeedbacks/NotFindFeedbacks";
import {getIsEmptyFeedbacksDB} from "@redux/selectors/getApiRequestState/getIsEmptyFeedbacksDB/getIsEmptyFeedbacksDB";

export const FeedbackContent:React.FC = () => {
    const feedbackData = useSelector(getFeedbackData);
    const isCollapseFeedback  = useSelector(getIsCollapseFeedback);
    const token = useSelector(getToken);
    const isSuccessSendFeedback = useSelector(getIsSuccessSendFeedback);
    const isEmptyFeedbacksDB = useSelector(getIsEmptyFeedbacksDB);
    const {setIsCollapseFeedback,setIsOpenModal} = apiRequestSlice.actions;
    const dispatch = useAppDispatch();

    const showModal = () => {
        dispatch(setIsOpenModal(true));
    };

    const renderFeedbackElems = useMemo(() => {
        const feedbackSlice = isCollapseFeedback ? feedbackData : feedbackData.slice(0, 4); //поменяй на последние 4 элемента а не первые
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
    const successModal = () => {
        Modal.success({icon: null, centered: true, title: '', okText: 'Отлично', okButtonProps: {block:true},
            maskStyle: { backgroundColor: 'rgba(121, 156, 213, 0.5)', backdropFilter: 'blur(5px)' }, width: 539,
            content: <><Result status='success' title="Отзыв успешно опубликован"/></>
        });
    };

    const errorHTTPModal = () => {
        Modal.error({icon: null, centered: true, title: '', okText: 'Назад',
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
        if (isSuccessSendFeedback) {
            dispatch(getFeedbacks(token));
            successModal();
        }
    },[isSuccessSendFeedback])

    return (
        <div className='feedback-content-wrapper'>
            {(isEmptyFeedbacksDB)
                ? <NotFindFeedbacks/>
                : <>
                <div className='feedback-cards-wrapper'>
                    {renderFeedbackElems}
                    <ModalFeedbackForm/>
                    <Button onClick={successModal}>Warning</Button>
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
                </>
            }
        </div>
    );
};
