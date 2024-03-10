import {RootState} from "@redux/configure-store";

export const getAuthState = (state: RootState) => state.authSlice;
