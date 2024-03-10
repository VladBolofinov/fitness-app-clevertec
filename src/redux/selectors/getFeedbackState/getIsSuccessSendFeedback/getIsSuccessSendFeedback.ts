import {createSelector} from "@reduxjs/toolkit";
import {getFeedbackState} from "@redux/selectors/getFeedbackState/getFeedbackState";
import {FeedbackStateType} from "@redux/types/FeedbackStateType";

export const getIsSuccessSendFeedback = createSelector(
    getFeedbackState,
    (feedbackSlice: FeedbackStateType) => feedbackSlice.isSuccessSendFeedback
)
