import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IApiRequest} from "@redux/stateTypes/IApiRequestSlice";
import {useHttp} from "@hooks/http.hook";

const initialState: IApiRequest = {
    jwt: '',
    error: '',
    isLoadingToken: false,
    inputLoginValue: '',
    inputPasswordValue: ''
}

export const fetchToken = createAsyncThunk(
    'apiRequest/fetchToken',
    ({email, password}:{email:string, password: string}) => {
        const {getToken} = useHttp();
        return getToken(email, password);
    }
)

export const apiRequestSlice = createSlice({
    name: 'apiRequestSlice',
    initialState,
    reducers: {
        setInputLoginValue(state, action: PayloadAction<string>) {
            state.inputLoginValue = action.payload;
        },
        setInputPasswordValue(state, action: PayloadAction<string>) {
            state.inputPasswordValue = action.payload;
        },
    },
    extraReducers:
        (builder) => {
            builder.addCase(fetchToken.pending, (state) => {state.isLoadingToken = true;})
                .addCase(fetchToken.fulfilled, (state,action:PayloadAction<string>) => {
                    state.isLoadingToken = false;
                    state.error = '';
                    state.jwt = action.payload;
                    localStorage.setItem('jwtToken', action.payload);
                })
                .addCase(fetchToken.rejected, (state) => {
                    state.isLoadingToken = false;
                    state.error = 'something was wrong!';
                })
                .addDefaultCase(() => {})
        }
})

const {reducer} = apiRequestSlice;
export default reducer;
