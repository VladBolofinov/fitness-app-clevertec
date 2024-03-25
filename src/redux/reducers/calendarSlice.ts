import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useHttp} from "@hooks/http.hook";
import {setIsLoadingRequest} from "@redux/reducers/authSlice";
import {CalendarStateType} from "@redux/types/CalendarStateType";

const initialState: CalendarStateType = {
    isErrorGetUserTrainings: false,
    isSuccessGetUserTrainings: false,
    isErrorTrainingList: false,
    isSuccessGetTrainingList: false,
    isPopoverOpen: false,
    currentDate: "",
    currentDateUserTrainings: [],
    currentTrainingExercises: [{
        name: "",
        replays: 0,
        weight: 0,
        approaches: 0,
    }],
    currentSelectValue: "",
    trainingList: [],
    popoverOffset: [0,0],
    userTrainings: [],
    isNextStepModal: false,
    isOpenDrawer: false
}

export const getUserTraining = createAsyncThunk(
    "calendarSlice/getUserTrainings",
    async (token:string, {dispatch}) => {
        const {getUserTraining} = useHttp();
        dispatch(setIsLoadingRequest(true));
        const result = await getUserTraining(token);
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
export const createTraining = createAsyncThunk(
    "calendarSlice/createTraining",
    async (token:string, {dispatch}) => {
        const {createTraining} = useHttp();
        dispatch(setIsLoadingRequest(true));
        const result = await createTraining(token);
        dispatch(setIsLoadingRequest(false));
        return result;
    }
)
export const editTraining = createAsyncThunk(
    "calendarSlice/createTraining",
    async (token:string, {dispatch}) => {
        const {editTraining} = useHttp();
        dispatch(setIsLoadingRequest(true));
        const result = await editTraining(token);
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
        },
        setCurrentDate(state, action: PayloadAction<string>) {
            state.currentDate = action.payload;
        },
        setCurrentDateUserTrainings(state, action: PayloadAction<string>) {
            state.currentDateUserTrainings = state.userTrainings.filter(item => item.date === action.payload);
        },
        setIsPopoverOpen(state, action: PayloadAction<boolean>) {
            state.isPopoverOpen = action.payload;
        },
        setIsNextStepModal(state, action: PayloadAction<boolean>) {
            state.isNextStepModal = action.payload;
        },
        setIsOpenDrawer(state, action: PayloadAction<boolean>) {
            state.isOpenDrawer = action.payload;
        },
        setCurrentSelectValue(state, action: PayloadAction<string>) {
            state.currentSelectValue = action.payload;
        },
        setCurrentTrainingExercises(state) {
            state.currentTrainingExercises.name = "Становая тяга";
            state.currentTrainingExercises.replays = 1;
            state.currentTrainingExercises.weight = 2;
            state.currentTrainingExercises.approaches = 2;
        },
    },
    extraReducers:
        (builder) => {
        builder.addCase(getUserTraining.fulfilled, (state, action:PayloadAction<any>) => {
            if (!Array.isArray(action.payload)) {
                state.isErrorGetUserTrainings = true;
            } else {
                state.isSuccessGetUserTrainings = true;
                state.userTrainings = action.payload;
                state.userTrainings.map((item) => {
                    item.date = new Date(item.date).toISOString().split('T')[0];
                })
            }
            })
            .addCase(getUserTraining.rejected, (state) => {
                state.isErrorGetUserTrainings = true;
            })
            .addCase(getAllTrainings.fulfilled, (state, action:PayloadAction<any>) => {
                if (!Array.isArray(action.payload)) {
                    state.isErrorTrainingList = true;
                } else {
                    state.isSuccessGetTrainingList = true;
                    state.trainingList = action.payload.map(item => {
                        return {
                            label: item.name,
                            value: item.key
                        };
                    });
                }
            })
            .addCase(getAllTrainings.rejected, (state) => {
                state.isErrorTrainingList = true;
            })
            .addCase(editTraining.fulfilled, (state) => {

            })
            .addCase(editTraining.rejected, (state) => {

            })
        }
})
export const { reducer: calendarReducer } = calendarSlice;
