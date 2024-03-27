import {getAllTrainings, getUserTraining} from "@redux/reducers/calendarSlice";

export const handleCalendarClick = (token:any, dispatch:any) => {
    dispatch(getUserTraining(token)).then((res:any) => {
        if (typeof(res.payload) !== "number")
            dispatch(getAllTrainings(token))
    })
}
