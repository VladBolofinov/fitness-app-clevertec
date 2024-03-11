import React, {useEffect, useMemo} from "react";
import "./FeedbackContent.scss";
import {Button} from "antd";
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
import {errorHTTPModal} from "../../../../sharedComponents/errorHTTPModal";
import {successModal} from "../../../../sharedComponents/suceessModal";
import {errorModal} from "../../../../sharedComponents/errorModal";

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

    useEffect(() => {
        if (isSuccessSendFeedback) {
            dispatch(getFeedbacks(token));
            successModal(onClearSuccessStatusSendFB);
        } else if (isErrorSendFeedback) {
            errorModal(onDeleteErrorStatusSendFB,() => {
                showModalFeedback();
                onDeleteErrorStatusSendFB();});
        } else if (isErrorGetFeedbacks) {
            errorHTTPModal(onClearErrorStatusGetFB);
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
