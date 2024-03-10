import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import {authReducer} from "@redux/reducers/authSlice";
import {routerSlice} from "@redux/reducers/routerSlice";
import {feedbackReducer} from "@redux/reducers/feedbackSlice";

const {
    createReduxHistory,
    routerMiddleware
} = createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
    reducer: combineReducers({
        router: routerSlice,
        authSlice: authReducer,
        feedbackSlice: feedbackReducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
