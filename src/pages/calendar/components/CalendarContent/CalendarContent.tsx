import React, {useEffect, useState} from "react";
import "./CalendarContent.scss";
import {Badge, Button, Calendar, Drawer} from "antd";
import {
    calendarSlice,
    createTraining,
    deleteTraining, editTraining,
    getAllTrainings,
    getUserTraining
} from "@redux/reducers/calendarSlice";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {useSelector} from "react-redux";
import {getToken} from "@redux/selectors/getAuthState/getToken/getToken";
import {localeRU} from "@pages/calendar/calendarLocale";
import "moment/locale/ru";
import moment from "moment";
import {errorTrainingList} from "../modalErrorTrainingList/errorTrainingList";
import {getIsErrorTrainingList} from "@redux/selectors/getCalendarState/getIsErrorTrainingList/getIsErrorTrainingList";
import {getIsCollapseSider} from "@redux/selectors/getAuthState/getIsCollapseSider/getIsCollapseSider";
import {getUserTrainings} from "@redux/selectors/getCalendarState/getUserTrainings/getUserTrainings";
import type { Moment } from 'moment';
import {badgeColors} from "@pages/calendar/constants/badgeColors";
import {Dispatch} from "@reduxjs/toolkit";
import {getIsPopoverOpen} from "@redux/selectors/getCalendarState/getIsPopoverOpen/getIsPopoverOpen";
import {PopoverComponent} from "@pages/calendar/components/PopoverComponent/PopoverComponent";
import {
    getIsNextStepModal
} from "@redux/selectors/getCalendarState/getIsNextStepModal/getIsNextStepModal";
import {getIsOpenDrawer} from "@redux/selectors/getCalendarState/getIsOpenDrawer/getIsOpenDrawer";
import {TestComponent} from "@pages/calendar/components/TestComponent/TestComponent";
import {getCurrentDate} from "@redux/selectors/getCalendarState/getCurrentDate/getCurrentDate";
import {
    getCurrentSelectValue
} from "@redux/selectors/getCalendarState/getCurrentSelectValue/getCurrentSelectValue";


//console.log("Дата в формате строки:", date.format('YYYY-MM-DD'));
//console.log("Год:", date.year());
//console.log("Месяц (отсчитывается от 0):", date.month());
//console.log("День:", date.date());
//console.log("День недели (отсчитывается от 0):", date.day());
//console.log("ISO неделя года:", date.isoWeek());
//console.log("День в году:", date.dayOfYear());
//const now = moment(); // Текущая дата
//console.log("Это прошлое:", date.isBefore(moment()));
//console.log("Это будущее:", date.isAfter(moment()));
//console.log("Это сегодняшняя дата:", date.isSame(moment(), 'day'));

export const CalendarContent:React.FC = () => {
    const dispatch = useAppDispatch();
    const token = useSelector(getToken);
    const isOpenDrawer = useSelector(getIsOpenDrawer);
    const isErrorTrainingList = useSelector(getIsErrorTrainingList);
    const isCollapsedSider = useSelector(getIsCollapseSider);
    const userTrainings = useSelector(getUserTrainings);
    const isPopoverOpen = useSelector(getIsPopoverOpen);
    const currentDate = useSelector(getCurrentDate);
    const currentSelectValue = useSelector(getCurrentSelectValue);
    const {setIsNextStepModal,clearIsErrorTrainingList,setPopoverOffset, setCurrentDate,
        setCurrentDateUserTrainings, setIsPopoverOpen, setIsOpenDrawer,setCurrentSelectValue} = calendarSlice.actions;
    moment.locale("ru_RU", {week: {dow: 1}});

    const repeatGetTrainingList = () => {
        dispatch(clearIsErrorTrainingList());
        dispatch(getAllTrainings(token));
    }

    useEffect(() => {
        if (isErrorTrainingList) {
            errorTrainingList(repeatGetTrainingList);
        }
    },[isErrorTrainingList])

    const dateCellRender = (value: Moment) => {
        return (
            <div className="cell-wrapper" onClick={(e) => handleCellClick(e, value, dispatch)}>
                {userTrainings.map((item) =>{
                    if (item.date === value.format('YYYY-MM-DD')) {
                        return (<li><Badge color={badgeColors[item.name]} text={item.name} /></li>)
                    }})}
            </div>
        );
    };

    const handleCellClick = (event:React.MouseEvent<HTMLDivElement, MouseEvent>,date:Moment, dispatch: Dispatch) => {
        event.stopPropagation();
        dispatch(setIsPopoverOpen(!isPopoverOpen));
        dispatch(setIsNextStepModal(false));
        const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect(); //разбить логику на отдельную функцию по поиску координат
        let resultLeftOffset;
        const bottomOffset = Math.floor(rect.top + window.scrollY);
        const lastDayOffset = (isCollapsedSider) ? 1050 : 920;
        const leftOffset = (isCollapsedSider) ? 189 : 169;
        const dayNumber = date.day();
        (dayNumber >= 1) ? resultLeftOffset = leftOffset*(dayNumber-1) : resultLeftOffset = lastDayOffset;
        dispatch(setPopoverOffset([resultLeftOffset, bottomOffset-138]));
        dispatch(setCurrentDate(date.format("DD-MM-YYYY")));
        dispatch(setCurrentDateUserTrainings(date.format("YYYY-MM-DD")));
        dispatch(setCurrentSelectValue(""));
    };

    return (
    <div className="calendar-wrapper" >
        {/*<button onClick={() => dispatch(getUserTraining(token))}>get user trainings</button>
        <button onClick={() => dispatch(getAllTrainings(token))}>get all trainings list</button>
        <button onClick={() => dispatch(editTraining(token))}>edit training</button>*/}
        {/*<button onClick={() => dispatch(createTraining(token))}>create training</button>*/}
        <PopoverComponent />
        <Calendar  locale={localeRU} mode="month" dateCellRender={dateCellRender}/>
        <>
            <Drawer title="Добавление упражнений" placement="right" onClose={() => dispatch(setIsOpenDrawer(false))} open={isOpenDrawer}>
                <p>{currentDate}</p>
                <p>{currentSelectValue}</p>
                <input type="text" placeholder="Упражнение" style={{marginBottom: "15px"}}/>
                <span>Подходы</span><input type="number"/>
                <span>Вес, кг</span><input type="number"/>
                <span>Кол-во</span><input type="number"/>
            </Drawer>
        </>
    </div>
    );
};
