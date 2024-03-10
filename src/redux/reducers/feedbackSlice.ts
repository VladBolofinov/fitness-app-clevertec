import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {useHttp} from "@hooks/http.hook";
import {setIsLoadingRequest} from "@redux/reducers/authSlice";
import {SendFeedbackArgsType} from "@redux/types/SendFeedbackArgsType";
import {FeedbackStateType} from "@redux/types/FeedbackStateType";
import {FeedbackDataPayload} from "@redux/types/FeedbackDataPayload";

const initialState: FeedbackStateType = {
    isSuccessSendFeedback: false,
    isErrorSendFeedback: false,
    feedbackData: [],
    isEmptyFeedbacksDB: false,
    isErrorGetFeedbacks: false,
    isOpenModal: false,
    feedbackMessage: "",
    rateScore: 0,
    isCollapseFeedback: false
}

export const sendFeedback = createAsyncThunk(
    "feedbackSlice/sendFeedback",
    async ({token, message, rating}:SendFeedbackArgsType, {dispatch}) => {
        const {sendFeedback} = useHttp();
        dispatch(setIsLoadingRequest(true));
        const result = await sendFeedback(token, message, rating);
        dispatch(setIsLoadingRequest(false));
        return result;
    }
)
export const getFeedbacks = createAsyncThunk(
    "feedbackSlice/getFeedbacks",
    async (token:string, {dispatch}) => {
        const {getFeedbacks} = useHttp();
        dispatch(setIsLoadingRequest(true));
        const result = await getFeedbacks(token);
        dispatch(setIsLoadingRequest(false));
        return result;
    }
)

export const feedbackSlice = createSlice({
    name: "feedbackSlice",
    initialState,
    reducers: {
        deleteIsSuccessSendFeedback(state) {
            state.isSuccessSendFeedback = false;
        },
        deleteIsErrorSendFeedback(state) {
            state.isErrorSendFeedback = false;
        },
        deleteIsErrorGetFeedbacks(state) {
            state.isErrorGetFeedbacks = false;
        },
        setIsOpenModal(state, action: PayloadAction<boolean>) {
            state.isOpenModal = action.payload;
        },
        setFeedbackMessage(state, action: PayloadAction<string>) {
            state.feedbackMessage = action.payload;
        },
        setRateScore(state, action: PayloadAction<number>) {
            state.rateScore = action.payload;
        },
        setIsCollapseFeedback(state) {
            state.isCollapseFeedback = !state.isCollapseFeedback;
        }
    },
    extraReducers:
        (builder) => {
            builder.addCase(getFeedbacks.fulfilled, (state, action:PayloadAction<FeedbackDataPayload[]>) => {
                    if (Array.isArray(action.payload)) {
                        (action.payload.length) ? state.feedbackData = action.payload.reverse() : state.isEmptyFeedbacksDB = true;
                    } else {
                        state.isErrorGetFeedbacks = true;
                    }
                })
                .addCase(getFeedbacks.rejected, (state) => {
                    state.isErrorGetFeedbacks = true;
                })
                .addCase(sendFeedback.fulfilled, (state, action:PayloadAction<number | undefined | string>) => {
                    if (typeof action.payload === "string") {
                        state.isSuccessSendFeedback = true;
                    } else if (action.payload === 500 || action.payload === 403) {
                        state.isErrorSendFeedback = true;
                    } else {
                        state.isSuccessSendFeedback = true;
                    }
                })
                .addCase(sendFeedback.rejected, (state) => {
                    state.isErrorSendFeedback = true;
                })
        }
})
export const { reducer: feedbackReducer } = feedbackSlice;
