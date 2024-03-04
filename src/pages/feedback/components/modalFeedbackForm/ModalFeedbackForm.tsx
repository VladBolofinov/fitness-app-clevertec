import React from 'react';
import {Button, Input, Modal, Rate} from "antd";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {getIsOpenModal} from "@redux/selectors/getApiRequestState/getIsOpenModal/getIsOpenModal";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {apiRequestSlice, sendFeedback} from "@redux/reducers/apiRequestSlice";
import {getRateScore} from "@redux/selectors/getApiRequestState/getRateScore/getRateScore";
import {getFeedbackMessage} from "@redux/selectors/getApiRequestState/getFeedbackMessage/getFeedbackMessage";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {getToken} from "@redux/selectors/getApiRequestState/getToken/getToken";
const { TextArea } = Input;
export const ModalFeedbackForm:React.FC = () => {
    const isOpenModal = useSelector(getIsOpenModal);
    const screens = useBreakpoint();
    const token = useSelector(getToken);
    const rateScore  = useSelector(getRateScore);
    const feedbackMessage = useSelector(getFeedbackMessage);
    const {setRateScore, setFeedbackMessage, deleteIsSuccessSendFeedback, setIsOpenModal} = apiRequestSlice.actions;
    const dispatch = useAppDispatch();
    const closeModal = () => {
        dispatch(setIsOpenModal(false));
        dispatch(deleteIsSuccessSendFeedback());
    };
    const handleCancel = () => {
        dispatch(setIsOpenModal(false));
        dispatch(sendFeedback({token,message: feedbackMessage , rating: rateScore}))
    };
    return (
        <>
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
        </>
    );
};
