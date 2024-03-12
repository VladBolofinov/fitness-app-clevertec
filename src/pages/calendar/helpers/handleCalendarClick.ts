import {getAllTrainings, getUserTrainings} from "@redux/reducers/calendarSlice";

export const handleCalendarClick = (token, dispatch) => {
    dispatch(getUserTrainings(token)).then((res) => {
        if (typeof(res.payload) !== "number")
            dispatch(getAllTrainings(token))
    })
}
