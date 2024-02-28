import {createSelector} from "@reduxjs/toolkit";
import {getRouterState} from "@redux/selectors/getRouterState/getRouterState";

export const getPreviousLocation = createSelector(
    getRouterState,
    (routerSlice) => routerSlice.previousLocation
)
