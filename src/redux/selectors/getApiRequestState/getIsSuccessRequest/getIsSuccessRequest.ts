import {createSelector} from "@reduxjs/toolkit";
import {getApiRequestState} from "@redux/selectors/getApiRequestState/getApiRequestState";
import {ApiRequestType} from "@redux/types/ApiRequestType";

export const getIsSuccessRequest = createSelector(
    getApiRequestState,
    (apiRequestSlice:ApiRequestType) => apiRequestSlice.isSuccessRequest
)
