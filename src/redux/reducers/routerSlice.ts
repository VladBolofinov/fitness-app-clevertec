import {createReduxHistoryContext} from "redux-first-history";
import {createBrowserHistory} from "history";
const {routerReducer} = createReduxHistoryContext({ history: createBrowserHistory() });

type RouterState = {
    previousLocation: { location: string }[];
};

type RouterAction = {
    type: string;
    payload: { location: string };
};

const initialState: RouterState = {
    previousLocation: [],
};

export const routerSlice = (
    state: RouterState = initialState,
    action: RouterAction
): RouterState => {
    if (action.type === '@@router/LOCATION_CHANGE') {
        const { location } = action.payload;
        const previousLocation = {
            location: location.pathname,
        };
        const updatedPreviousLocation = [previousLocation, ...state.previousLocation.slice(0, 1)];
        return {
            ...routerReducer(state, action),
            previousLocation: updatedPreviousLocation,
        };
    }
    return routerReducer(state, action) as RouterState;
}
