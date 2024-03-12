import {RootState} from "@redux/configure-store";

export const getCalendarState = (state: RootState) => state.calendarSlice;
