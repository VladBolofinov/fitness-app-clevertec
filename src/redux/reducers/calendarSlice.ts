import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useHttp} from "@hooks/http.hook";
import {setIsLoadingRequest} from "@redux/reducers/authSlice";
import {CalendarStateType} from "@redux/types/CalendarStateType";

const initialState: CalendarStateType = {
    isErrorGetUserTrainings: false,
    isSuccessGetUserTrainings: false,
    isErrorTrainingList: false,
    isSuccessGetTrainingList: false,
    trainingList: [],
    popoverOffset: [0,0]
}

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
    reducers: {
        clearIsErrorTrainings(state) {
            state.isErrorGetUserTrainings = false;
        },
        clearIsErrorTrainingList(state) {
            state.isErrorTrainingList = false;
        },
        setPopoverOffset(state, action: PayloadAction<[number, number]>) {
            state.popoverOffset = action.payload;
        }
    },
    extraReducers:
        (builder) => {
        builder.addCase(getUserTrainings.fulfilled, (state, action:PayloadAction<any>) => {
            if (!Array.isArray(action.payload)) {
                state.isErrorGetUserTrainings = true;
            } else {
                state.isSuccessGetUserTrainings = true;
            }
            })
            .addCase(getUserTrainings.rejected, (state) => {
                state.isErrorGetUserTrainings = true;
            })
            .addCase(getAllTrainings.fulfilled, (state, action:PayloadAction<any>) => {
                if (!Array.isArray(action.payload)) {
                    state.isErrorTrainingList = true;
                } else {
                    state.isSuccessGetTrainingList = true;
                    state.trainingList.push(action.payload);
                }
            })
            .addCase(getAllTrainings.rejected, (state) => {
                state.isErrorTrainingList = true;
            })
        }
})
export const { reducer: calendarReducer } = calendarSlice;
