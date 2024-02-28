import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from 'history';
import {apiRequestReducer} from "@redux/reducers/apiRequestSlice";
import {routerSlice} from "@redux/reducers/routerSlice";

const {
    createReduxHistory,
    routerMiddleware
} = createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
    reducer: combineReducers({
        router: routerSlice,
        apiRequestSlice: apiRequestReducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
