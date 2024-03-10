import {createSelector} from "@reduxjs/toolkit";
import {getAuthState} from "@redux/selectors/getAuthState/getAuthState";
import {AuthStateType} from "@redux/types/AuthStateType";

export const getLogin = createSelector(
    getAuthState,
    (authSlice:AuthStateType) => authSlice.login
)
