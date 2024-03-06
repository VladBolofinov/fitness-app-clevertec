import {createSelector} from "@reduxjs/toolkit";
import {getApiRequestState} from "@redux/selectors/getApiRequestState/getApiRequestState";
import {ApiRequestType} from "@redux/types/ApiRequestType";

export const getLogin = createSelector(
    getApiRequestState,
    (apiRequestSlice:ApiRequestType) => apiRequestSlice.login
)
