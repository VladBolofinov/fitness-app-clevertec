import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

export const calendarSlice = createSlice({
    name: "feedbackSlice",
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {}
})
export const { reducer: calendarReducer } = calendarSlice;
