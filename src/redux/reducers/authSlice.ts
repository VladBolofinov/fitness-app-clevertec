import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {AuthStateType} from "@redux/types/AuthStateType";
import {useHttp} from "@hooks/http.hook";
import {IInputValues} from "@pages/main/components/types/IInputValues";
import {ConfirmPasswordArguments} from "@redux/types/ConfirmPasswordArguments";
import {FetchTokenFulfilledPayload} from "@redux/types/FetchTokenPayload";
import {httpStatusVars} from "@redux/types/httpStatusVars";

const initialState: AuthStateType = {
    jwt: "",
    isLoadingRequest: false,
    isErrorStatus: false,
    isSuccessRequest: false,
    isCollapseSider: false,
    checkCodeInputValue: "",
    login: "",
    password: "",
    firstConfirmPassword: "",
    secondConfirmPassword: ""
}
export const authenticateUser = createAsyncThunk(
    "authSlice/authenticateUser",
    async ({login, password, remember}:IInputValues, {dispatch}) => {
        const {authenticateUser} = useHttp();
        dispatch(setIsLoadingRequest(true));
        const result = await authenticateUser(login, password, remember);
        dispatch(setIsLoadingRequest(false));
        return result;
    }
)
export const googleAuthenticateUser = createAsyncThunk(
    "authSlice/googleAuthenticateUser",
    async (_, {dispatch}) => {
        const {googleAuthenticateUser} = useHttp();
        dispatch(setIsLoadingRequest(true));
        const result = await googleAuthenticateUser();
        dispatch(setIsLoadingRequest(false));
        return result;
    }
)
export const registerNewUser = createAsyncThunk(
    "authSlice/registerNewUser",
    async ({login, password}:IInputValues, {dispatch}) => {
        const {registerNewUser} = useHttp();
        dispatch(setIsLoadingRequest(true));
        const result = await registerNewUser(login, password);
        dispatch(setIsLoadingRequest(false));
        return result;
    }
)
export const checkEmail = createAsyncThunk(
    "authSlice/checkEmail",
    async (email:string, {dispatch}) => {
        const {checkEmail} = useHttp();
        dispatch(setIsLoadingRequest(true));
        const result = await checkEmail(email);
        dispatch(setIsLoadingRequest(false));
        return result;
    }
)
export const confirmEmail = createAsyncThunk(
    "authSlice/confirmEmail",
    async ({login, code}: { login: string, code: string }, {dispatch}) => {
        const {confirmEmail} = useHttp();
        dispatch(setIsLoadingRequest(true));
        const result = await confirmEmail(login, code);
        dispatch(setIsLoadingRequest(false));
        return result;
    }
)
export const changePassword = createAsyncThunk(
    "authSlice/changePassword",
    async ({password, confirmPassword}: ConfirmPasswordArguments, {dispatch}) => {
        const {changePassword} = useHttp();
        dispatch(setIsLoadingRequest(true));
        const result = await changePassword(password, confirmPassword);
        dispatch(setIsLoadingRequest(false));
        return result;
    }
)

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setIsLoadingRequest(state, action: PayloadAction<boolean>) {
            state.isLoadingRequest = action.payload;
        },
        deleteErrorStatus(state) {
            state.isErrorStatus = false;
        },
        deleteSuccessStatus(state) {
            state.isSuccessRequest = false;
        },
        saveRegDataBeforeError(state, action: PayloadAction<IInputValues>) {
            state.login = action.payload.login;
            state.password = action.payload.password;
        },
        setCheckCodeInput(state, action: PayloadAction<string>) {
            state.checkCodeInputValue = action.payload;
        },
        saveConfirmPasswords(state, action: PayloadAction<ConfirmPasswordArguments>) {
            state.firstConfirmPassword = action.payload.password;
            state.secondConfirmPassword = action.payload.confirmPassword;
        },
        setIsCollapseSider(state) {
            state.isCollapseSider = !state.isCollapseSider;
        },
        saveTokenAtStore(state, action: PayloadAction<string>) {
            state.jwt = action.payload;
        }
    },
    extraReducers:
        (builder) => {
            builder.addCase(authenticateUser.fulfilled, (state, action: PayloadAction<FetchTokenFulfilledPayload | number | undefined>) => {
                if (typeof action.payload === "object" && "rememberUser" in action.payload) {
                    const { token, rememberUser } = action.payload;
                    if (token) {
                        state.jwt = token;
                        (rememberUser)
                            ? localStorage.setItem("jwtToken", token)
                            : sessionStorage.setItem("jwtToken", token);
                    }
                }
                (typeof action.payload === "number" && action.payload === httpStatusVars["_401"])
                    ? state.isErrorStatus = true : state.isErrorStatus = false;
            })
                .addCase(authenticateUser.rejected, (state) => {
                    state.isErrorStatus = true;
                })
                .addCase(googleAuthenticateUser.rejected, (state) => {
                    state.isErrorStatus = true;
                })
                .addCase(registerNewUser.fulfilled, (state, action:PayloadAction<number | undefined>) => {
                    state.isSuccessRequest = true;
                    if (action.payload === httpStatusVars["_409"]) {
                        state.isErrorStatus = true;
                    } else if (action.payload !== httpStatusVars["_201"]) {
                        state.isErrorStatus = true;
                    }
                })
                .addCase(registerNewUser.rejected, (state) => {
                    state.isErrorStatus = true;
                })
                .addCase(checkEmail.fulfilled, (state, action:PayloadAction<number | undefined>) => {
                    state.isSuccessRequest = true;
                    if (action.payload === httpStatusVars["_404"]) {
                        state.isErrorStatus = true;
                    } else if (action.payload !== httpStatusVars["_200"]) {
                        state.isErrorStatus = true;
                    }
                })
                .addCase(checkEmail.rejected, (state) => {
                    state.isErrorStatus = true;
                })
                .addCase(confirmEmail.fulfilled, (state, action:PayloadAction<number | undefined>) => {
                    state.isSuccessRequest = true;
                    if (action.payload !== httpStatusVars["_200"]) {
                        state.isErrorStatus = true;
                        state.checkCodeInputValue = "";
                    }
                })
                .addCase(changePassword.fulfilled, (state, action:PayloadAction<number | undefined>) => {
                    state.isSuccessRequest = true;
                    if (action.payload !== httpStatusVars["_200"]) {
                        state.isErrorStatus = true;
                    }
                })
        }
})
export const {setIsLoadingRequest} = authSlice.actions;
export const { reducer: authReducer } = authSlice;
