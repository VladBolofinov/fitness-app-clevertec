import {FeedbackDataPayload} from "@redux/types/FeedbackDataPayload";

export type FeedbackStateType = {
    isSuccessSendFeedback: boolean;
    isErrorSendFeedback: boolean;
    feedbackData: FeedbackDataPayload[];
    isEmptyFeedbacksDB: boolean;
    isErrorGetFeedbacks: boolean;
    isOpenModal: boolean;
    feedbackMessage: string;
    rateScore: number;
    isCollapseFeedback: boolean;
}
