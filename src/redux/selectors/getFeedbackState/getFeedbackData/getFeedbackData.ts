import {createSelector} from "@reduxjs/toolkit";
import {FeedbackStateType} from "@redux/types/FeedbackStateType";
import {getFeedbackState} from "@redux/selectors/getFeedbackState/getFeedbackState";

export const getFeedbackData = createSelector(
    getFeedbackState,
    (feedbackSlice:FeedbackStateType) => feedbackSlice.feedbackData
)
