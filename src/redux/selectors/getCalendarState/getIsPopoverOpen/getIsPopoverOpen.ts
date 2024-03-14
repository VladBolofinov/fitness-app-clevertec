import {createSelector} from "@reduxjs/toolkit";
import {getCalendarState} from "@redux/selectors/getCalendarState/getCalendarState";
import {CalendarStateType} from "@redux/types/CalendarStateType";

export const getIsPopoverOpen = createSelector(
    getCalendarState,
    (calendarSlice:CalendarStateType) => calendarSlice.isPopoverOpen
)
