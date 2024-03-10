import {createSelector} from "@reduxjs/toolkit";
import {getFeedbackState} from "@redux/selectors/getFeedbackState/getFeedbackState";
import {FeedbackStateType} from "@redux/types/FeedbackStateType";


export const getIsErrorSendFeedback = createSelector(
    getFeedbackState,
    (feedbackSlice: FeedbackStateType) => feedbackSlice.isErrorSendFeedback
)

