import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {IApiRequest} from "@redux/stateTypes/IApiRequestSlice";
import {useHttp} from "@hooks/http.hook";

const initialState: IApiRequest = {
    jwt: '',
    error: '',
    isLoadingToken: false,
    inputLoginValue: '',
    inputPasswordValue: '',
    inputRememberUser: false
}

export const fetchToken = createAsyncThunk(
    'apiRequest/fetchToken',
    ({email, password, rememberUser}:{email:string, password: string, rememberUser: boolean}) => {
        const {getToken} = useHttp();
        return getToken(email, password, rememberUser);
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
        setInputRememberUser(state) {
            state.inputRememberUser = !state.inputRememberUser;
        }
    },
    extraReducers:
        (builder) => {
            builder.addCase(fetchToken.pending, (state) => {state.isLoadingToken = true;})
                .addCase(fetchToken.fulfilled, (state,action:PayloadAction<string>) => {
                    //типизируй экшен нормально
                    state.isLoadingToken = false;
                    state.error = '';
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
                .addDefaultCase(() => {})
        }
})

const {reducer} = apiRequestSlice;
export default reducer;
