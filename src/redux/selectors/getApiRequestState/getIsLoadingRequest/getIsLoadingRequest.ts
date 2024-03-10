import {createSelector} from "@reduxjs/toolkit";
import {getApiRequestState} from "@redux/selectors/getApiRequestState/getApiRequestState";
import {AuthStateType} from "@redux/types/AuthStateType";

export const getIsLoadingRequest = createSelector(
    getApiRequestState,
    (authSlice:AuthStateType) => authSlice.isLoadingRequest
)
