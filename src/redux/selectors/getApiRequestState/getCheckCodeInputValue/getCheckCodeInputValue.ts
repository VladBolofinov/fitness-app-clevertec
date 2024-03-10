import {createSelector} from "@reduxjs/toolkit";
import {getApiRequestState} from "@redux/selectors/getApiRequestState/getApiRequestState";
import {AuthStateType} from "@redux/types/AuthStateType";

export const getCheckCodeInputValue = createSelector(
    getApiRequestState,
    (authSlice:AuthStateType) => authSlice.checkCodeInputValue
)
