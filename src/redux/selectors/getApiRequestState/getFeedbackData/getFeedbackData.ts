import {createSelector} from "@reduxjs/toolkit";
import {getApiRequestState} from "@redux/selectors/getApiRequestState/getApiRequestState";
import {ApiRequestType} from "@redux/types/ApiRequestType";


export const getFeedbackData = createSelector(
    getApiRequestState,
    (apiRequestSlice:ApiRequestType) => apiRequestSlice.feedbackData
)
