import {FeedbackDataPayload} from "@redux/types/FeedbackDataPayload";

export type ApiRequestType = {
    jwt: string;
    isLoadingRequest: boolean;
    isErrorStatus: boolean;
    isSuccessRequest: boolean;
    isCollapseSider: boolean;
    checkCodeInputValue: string;
    login: string;
    password: string;
    firstConfirmPassword: string;
    secondConfirmPassword: string;
    feedbackData: FeedbackDataPayload[];
    isEmptyFeedbacksDB: boolean;
    isCollapseFeedback: boolean;
    rateScore: number;
    feedbackMessage: string;
    isOpenModal: boolean;
    isSuccessSendFeedback: boolean;
    isErrorSendFeedback: boolean;
}
