import {createSelector} from "@reduxjs/toolkit";
import {getRouterState} from "@redux/selectors/getRouterState/getRouterState";

export const getLocation = createSelector(
    getRouterState,
    (routerSlice) => routerSlice.location
)
