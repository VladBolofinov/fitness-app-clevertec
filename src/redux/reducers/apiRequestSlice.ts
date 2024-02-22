import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IApiRequest} from "@redux/stateTypes/IApiRequestSlice";
import {useHttp} from "@hooks/http.hook";
import {IInputValues} from "@pages/main/components/types/IInputValues";

const initialState: IApiRequest = {
    jwt: '',
    error: '',
    isLoadingRequest: false,
    isErrorStatus: false,
    isRegistrationSuccess: false
}
type FetchTokenFulfilledPayload = {
    token: string;
    inputCheck: boolean;
};

export const fetchToken = createAsyncThunk(
    'apiRequest/fetchToken',
    ({login, password, remember}:IInputValues) => {
        const {getToken} = useHttp();
        return getToken(login, password, remember);
    }
)

export const registerNewUser = createAsyncThunk(
    'apiRequest/registerNewUser',
    ({login, password}:IInputValues) => {
        const {registerNewUser} = useHttp();
        return registerNewUser(login, password);
    }
)

export const apiRequestSlice = createSlice({
    name: 'apiRequestSlice',
    initialState,
    reducers: {
        deleteErrorStatus(state) {
            state.isErrorStatus = false;
        },
        deleteRegistrationStatus(state) {
            state.isRegistrationSuccess = false;
        }
    },
    extraReducers:
        (builder) => {
            builder.addCase(fetchToken.pending, (state) => {state.isLoadingRequest = true;})
                .addCase(fetchToken.fulfilled, (state, action: PayloadAction<FetchTokenFulfilledPayload | number>) => {
                    state.isLoadingRequest = false;
                    state.error = '';
                    if (typeof action.payload === 'number' && action.payload === 401) {
                        state.isErrorStatus = true;
                    } else if (typeof action.payload === 'number' && action.payload === 404) {
                        state.isErrorStatus = true;
                    }
                    if (typeof action.payload === 'object' && 'inputCheck' in action.payload) {
                        const { token, inputCheck } = action.payload;
                        if (token) {
                            state.jwt = token;
                            if (inputCheck) {
                                localStorage.setItem('jwtToken', token);
                            } else {
                                sessionStorage.setItem('jwtToken', token);
                            }
                        }
                    }
                })
                .addCase(fetchToken.rejected, (state) => {
                    state.isLoadingRequest = false;
                    state.error = 'something was wrong!';
                    state.isErrorStatus = true;
                })
                .addCase(registerNewUser.pending, (state) => {state.isLoadingRequest = true;})
                .addCase(registerNewUser.fulfilled, (state, action:PayloadAction<any>) => {
                    //типизируй экшен нормально
                    state.isLoadingRequest = false;
                    state.error = '';
                    state.isRegistrationSuccess = true;
                    if (typeof action.payload === 'number' && action.payload === 409) {
                        state.isErrorStatus = true;
                    } else if (typeof action.payload === 'number' && action.payload !== 201) {
                        state.isErrorStatus = true;
                    }
                    //console.log(action.payload);
                })
                .addCase(registerNewUser.rejected, (state) => {
                    state.isLoadingRequest = false;
                    state.error = 'something was wrong!';
                    state.isErrorStatus = true;
                })
                .addDefaultCase(() => {})
        }
})

const {reducer} = apiRequestSlice;
export default reducer;
