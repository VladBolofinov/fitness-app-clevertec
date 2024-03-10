import {createSelector} from "@reduxjs/toolkit";
import {FeedbackStateType} from "@redux/types/FeedbackStateType";
import {getFeedbackState} from "@redux/selectors/getFeedbackState/getFeedbackState";

export const getFeedbackMessage = createSelector(
    getFeedbackState,
    (feedbackSlice:FeedbackStateType) => feedbackSlice.feedbackMessage
)
