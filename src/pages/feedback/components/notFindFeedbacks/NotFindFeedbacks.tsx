import React from "react";
import "./NotFindFeedbacks.scss";
import {Button} from "antd/es";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {ModalFeedbackForm} from "@pages/feedback/components/modalFeedbackForm/ModalFeedbackForm";
import {feedbackSlice} from "@redux/reducers/feedbackSlice";
export const NotFindFeedbacks:React.FC = () => {
    const {setIsOpenModal} = feedbackSlice.actions;
    const dispatch = useAppDispatch();
    return (
        <>
            <div className="not-find-feedback-wrapper">
                <p className="not-find-feedback-header">Оставьте свой отзыв первым</p>
                <p className="not-find-feedback-descr">
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                    своим мнением и опытом с другими пользователями, и помогите им сделать правильный выбор.
                </p>
            </div>
            <div className="btn-wrapper">
                <Button type="primary" block data-test-id="write-review" onClick={() => dispatch(setIsOpenModal(true))}>Написать отзыв</Button>
            </div>
            <ModalFeedbackForm/>
        </>
    );
};
