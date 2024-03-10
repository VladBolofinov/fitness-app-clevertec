import {RootState} from "@redux/configure-store";

export const getApiRequestState = (state: RootState) => state.authSlice;
