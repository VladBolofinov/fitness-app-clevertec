import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IApiRequest} from "@redux/stateTypes/IApiRequestSlice";
import {useHttp} from "@hooks/http.hook";
import {IInputValues} from "@pages/main/components/types/IInputValues";

const initialState: IApiRequest = {
    jwt: '',
    error: '',
    isLoadingToken: false
}

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
    reducers: {},
    extraReducers:
        (builder) => {
            builder.addCase(fetchToken.pending, (state) => {state.isLoadingToken = true;})
                .addCase(fetchToken.fulfilled, (state,action:PayloadAction<{ token:string, inputCheck: boolean }>) => {
                    //типизируй экшен нормально
                    state.isLoadingToken = false;
                    state.error = '';
                    console.log(action.payload);
                    const {token, inputCheck} = action.payload;
                    if (token) {
                        state.jwt = token;
                        if (inputCheck) {
                            localStorage.setItem('jwtToken', token);
                        } else {
                            sessionStorage.setItem('jwtToken', token);
                        }
                    }
                })
                .addCase(fetchToken.rejected, (state) => {
                    state.isLoadingToken = false;
                    state.error = 'something was wrong!';
                })
                .addCase(registerNewUser.pending, (state) => {state.isLoadingToken = true;})
                .addCase(registerNewUser.fulfilled, (state) => {
                    //типизируй экшен нормально
                    state.isLoadingToken = false;
                    state.error = '';
                })
                .addCase(registerNewUser.rejected, (state) => {
                    state.isLoadingToken = false;
                    state.error = 'something was wrong!';
                })
                .addDefaultCase(() => {})
        }
})

const {reducer} = apiRequestSlice;
export default reducer;
