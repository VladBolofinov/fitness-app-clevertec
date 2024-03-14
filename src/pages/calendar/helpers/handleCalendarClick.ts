import {getAllTrainings, getUserTraining} from "@redux/reducers/calendarSlice";

export const handleCalendarClick = (token, dispatch) => {
    dispatch(getUserTraining(token)).then((res) => {
        if (typeof(res.payload) !== "number")
            dispatch(getAllTrainings(token))
    })
}
