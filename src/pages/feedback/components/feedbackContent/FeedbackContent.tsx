import React, {useEffect, useMemo} from "react";
import "./FeedbackContent.scss";
import {Button, Modal, Result} from "antd";
import {useSelector} from "react-redux";
import {getFeedbackData} from "@redux/selectors/getFeedbackState/getFeedbackData/getFeedbackData";
import {FeedbackCard} from "@pages/feedback/components/feedbackCard/FeedbackCard";
import {getIsCollapseFeedback} from "@redux/selectors/getFeedbackState/getIsCollapseFeedback/getIsCollapseFeedback";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {getToken} from "@redux/selectors/getAuthState/getToken/getToken";
import {getIsSuccessSendFeedback} from "@redux/selectors/getFeedbackState/getIsSuccessSendFeedback/getIsSuccessSendFeedback";
import {ModalFeedbackForm} from "@pages/feedback/components/modalFeedbackForm/ModalFeedbackForm";
import {NotFindFeedbacks} from "@pages/feedback/components/notFindFeedbacks/NotFindFeedbacks";
import {getIsEmptyFeedbacksDB} from "@redux/selectors/getFeedbackState/getIsEmptyFeedbacksDB/getIsEmptyFeedbacksDB";
import {getIsErrorSendFeedback} from "@redux/selectors/getFeedbackState/getIsErrorSendFeedback/getIsErrorSendFeedback";
import {history} from "@redux/configure-store";
import {AppRoutes} from "../../../../router/routeConfig";
import {getPreviousLocation} from "@redux/selectors/getRouterState/getPreviousLocation/getPreviousLocation";
import {feedbackSlice, getFeedbacks} from "@redux/reducers/feedbackSlice";
import {getIsErrorGetFeedbacks} from "@redux/selectors/getFeedbackState/getIsErrorGetFeedbacks/getIsErrorGetFeedbacks";

export const FeedbackContent:React.FC = () => {
    const feedbackData = useSelector(getFeedbackData);
    const isCollapseFeedback  = useSelector(getIsCollapseFeedback);
    const token = useSelector(getToken);
    const isSuccessSendFeedback = useSelector(getIsSuccessSendFeedback);
    const isErrorSendFeedback = useSelector(getIsErrorSendFeedback);
    const isEmptyFeedbacksDB = useSelector(getIsEmptyFeedbacksDB);
    const previousLocation = useSelector(getPreviousLocation);
    const isErrorGetFeedbacks = useSelector(getIsErrorGetFeedbacks);
    const {deleteIsErrorSendFeedback, deleteIsErrorGetFeedbacks, setIsOpenModal,setIsCollapseFeedback, deleteIsSuccessSendFeedback} = feedbackSlice.actions;
    const dispatch = useAppDispatch();

    const showModalFeedback = () => {
        dispatch(setIsOpenModal(true));
    };
    const onClearSuccessStatusSendFB = () => {
        dispatch(deleteIsSuccessSendFeedback());
    }
    const onClearErrorStatusGetFB = () => {
        dispatch(deleteIsErrorGetFeedbacks());
        history.push(AppRoutes.MAIN);
    }
    const onDeleteErrorStatusSendFB = () => {
        dispatch(deleteIsErrorSendFeedback());
    }
    const renderFeedbackElems = useMemo(() => {
        const feedbackSlice = isCollapseFeedback ? feedbackData : feedbackData.slice(0, 4);
        return feedbackSlice.map((item) => <FeedbackCard item={item}/>);
    }, [feedbackData, isCollapseFeedback]);
    const errorModal = () => {
        Modal.confirm({icon: null, centered: true, title: "", cancelText: "Написать отзыв",
            onCancel: () => {showModalFeedback();onDeleteErrorStatusSendFB();},
            cancelButtonProps: {block: true, type: "primary", "data-test-id": "write-review-not-saved-modal"},
            okText: "Закрыть", onOk: onDeleteErrorStatusSendFB, okButtonProps: {block:true, type: "default"},
            maskStyle: { backgroundColor: "rgba(121, 156, 213, 0.5)", backdropFilter: "blur(5px)" }, width: 539,
            content: <Result
                status="error"
                title="Данные не сохранились"
                subTitle="Что-то пошло не так. Попробуйте еще раз."
            />
        });
    };
    const successModal = () => {
        Modal.success({icon: null, centered: true, title: "", okText: "Отлично", onOk: onClearSuccessStatusSendFB, okButtonProps: {block:true},
            maskStyle: { backgroundColor: "rgba(121, 156, 213, 0.5)", backdropFilter: "blur(5px)" }, width: 539,
            content: <Result status="success" title="Отзыв успешно опубликован"/>
        });
    };

    const errorHTTPModal = () => {
        Modal.error({icon: null, centered: true, title: "", okText: "Назад",
            okButtonProps: {block:false},
            maskStyle: { backgroundColor: 'rgba(121, 156, 213, 0.5)', backdropFilter: "blur(5px)" },
            width: 539,
            onOk: onClearErrorStatusGetFB,
            bodyStyle: {padding: "64px 32px 56px 32px"},
            content: <Result
                status="500"
                title="Что-то пошло не так"
                subTitle="Произошла ошибка.Попробуйте еще раз."
            />
        });
    };
    useEffect(() => {
        if (isSuccessSendFeedback) {
            dispatch(getFeedbacks(token));
            successModal();
        } else if (isErrorSendFeedback) {
            errorModal();
        } else if (isErrorGetFeedbacks) {
            errorHTTPModal();
        }
    },[isSuccessSendFeedback, isErrorSendFeedback, isErrorGetFeedbacks])

    useEffect(() => {
            if (!(previousLocation[1]?.location === AppRoutes.ROOT || previousLocation[1]?.location === AppRoutes.MAIN)) {
                localStorage.clear();
                history.push(AppRoutes.AUTH);
            }
    },[])
    return (
        <div className="feedback-content-wrapper">
            {(isEmptyFeedbacksDB)
                ? <NotFindFeedbacks/>
                : <>
                        <div className="feedback-cards-wrapper">
                            {renderFeedbackElems}
                            <ModalFeedbackForm/>
                        </div>
            <div className="feedback-content-btn-wrapper">
                <Button type="primary" onClick={showModalFeedback}
                        data-test-id="write-review">Написать отзыв</Button>
                <Button type="link" onClick={() => dispatch(setIsCollapseFeedback())}
                        data-test-id="all-reviews-button">
                    {isCollapseFeedback ? "Свернуть" : "Развернуть"} все отзывы
                </Button>
            </div>
        </>}
        </div>
    );
};
