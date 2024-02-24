import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from 'history';
import apiRequestSlice from "@redux/reducers/apiRequestSlice";
const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory({savePreviousLocations: 1}) });

export const store = configureStore({
    reducer: combineReducers({
        router: (state = { previousLocation: [] }, action) => {
            if (action.type === '@@router/LOCATION_CHANGE') {
                const { location } = action.payload;
                const previousLocation = {
                    location: location.pathname,
                };
                const updatedPreviousLocation = [previousLocation, ...state.previousLocation.slice(0,1)];
                return {
                    ...routerReducer(state, action),
                    previousLocation: updatedPreviousLocation,
                };
            }
            return routerReducer(state, action);
        },
        apiRequestSlice
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
