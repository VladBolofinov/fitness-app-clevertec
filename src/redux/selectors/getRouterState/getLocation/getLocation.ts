import { createSelector } from "@reduxjs/toolkit";
import { getRouterState } from "@redux/selectors/getRouterState/getRouterState";

export const getLocation = createSelector(
    getRouterState,
    (routerSlice) => {
        if (routerSlice.previousLocation.length > 0) {
            return routerSlice.previousLocation[0].location;
        } else {
            return null;
        }
    }
);

