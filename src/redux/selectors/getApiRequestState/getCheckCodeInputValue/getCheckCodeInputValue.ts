import {createSelector} from "@reduxjs/toolkit";
import {getApiRequestState} from "@redux/selectors/getApiRequestState/getApiRequestState";
import {IApiRequest} from "@redux/types/IApiRequestSlice";

export const getCheckCodeInputValue = createSelector(
    getApiRequestState,
    (apiRequestSlice:IApiRequest) => apiRequestSlice.checkCodeInputValue
)
