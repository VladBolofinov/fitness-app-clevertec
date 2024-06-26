import {createSelector} from "@reduxjs/toolkit";
import {getCalendarState} from "@redux/selectors/getCalendarState/getCalendarState";
import {CalendarStateType} from "@redux/types/CalendarStateType";

export const getIsSuccessGetTrainingList = createSelector(
    getCalendarState,
    (calendarSlice:CalendarStateType) => calendarSlice.isSuccessGetTrainingList
)
//удали если нигде не использовалось
