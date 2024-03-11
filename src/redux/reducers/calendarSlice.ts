import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "@hooks/http.hook";
import {setIsLoadingRequest} from "@redux/reducers/authSlice";

const initialState = {}


export const getUserTrainings = createAsyncThunk(
    "calendarSlice/getUserTrainings",
    async (token:string, {dispatch}) => {
        const {getUserTrainings} = useHttp();
        dispatch(setIsLoadingRequest(true));
        const result = await getUserTrainings(token);
        dispatch(setIsLoadingRequest(false));
        return result;
    }
)
export const getAllTrainings = createAsyncThunk(
    "calendarSlice/getAllTrainings",
    async (token:string, {dispatch}) => {
        const {getAllTrainings} = useHttp();
        dispatch(setIsLoadingRequest(true));
        const result = await getAllTrainings(token);
        dispatch(setIsLoadingRequest(false));
        return result;
    }
)
export const calendarSlice = createSlice({
    name: "feedbackSlice",
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {}
})
export const { reducer: calendarReducer } = calendarSlice;
