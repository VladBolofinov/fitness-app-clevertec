import React, {useEffect, useState} from "react";
import "./CalendarContent.scss";
import {Badge, Button, Calendar, Popover} from "antd";
import {calendarSlice, getAllTrainings, getUserTrainings} from "@redux/reducers/calendarSlice";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {useSelector} from "react-redux";
import {getToken} from "@redux/selectors/getAuthState/getToken/getToken";
import {localeRU} from "@pages/calendar/calendarLocale";
import "moment/locale/ru";
import moment from "moment";
import {errorTrainingList} from "../modalErrorTrainingList/errorTrainingList";
import {getIsErrorTrainingList} from "@redux/selectors/getCalendarState/getIsErrorTrainingList/getIsErrorTrainingList";
import {
    getIsCollapseSider
} from "@redux/selectors/getAuthState/getIsCollapseSider/getIsCollapseSider";
import {
    getPopoverOffset
} from "@redux/selectors/getCalendarState/getPopoverOffset/getPopoverOffset";



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
    const isErrorTrainingList = useSelector(getIsErrorTrainingList);
    const isCollapsedSider = useSelector(getIsCollapseSider);
    const popoverOffset = useSelector(getPopoverOffset);
    const {clearIsErrorTrainingList,setPopoverOffset} = calendarSlice.actions;
    moment.locale("ru_RU", {week: {dow: 1}});


    const repeatGetTrainingList = () => {
        dispatch(clearIsErrorTrainingList());
        dispatch(getAllTrainings(token));
    }

    const content = (
        <div>
           {/* <Paragraph editable={{ onChange: setEditableStr }}>{editableStr}</Paragraph>*/}
            <Badge color="#f50" text="Руки" />
            <Badge color="#f50" text="Ноги" />
            <Badge color="#f50" text="Силовая" />
            <Badge color="#f50" text="Грудь" />
            <Badge color="#f50" text="Спина" />
            <button>Close</button>
        </div> )

    useEffect(() => {
        if (isErrorTrainingList) {
            errorTrainingList(repeatGetTrainingList);
        }
    },[isErrorTrainingList])


    /*const getListData = (value: Moment) => {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'success', content: 'This is usual event.' },
                ];
                break;
            case 10:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'success', content: 'This is usual event.' },
                    { type: 'error', content: 'This is error event.' },
                ];
                break;
            case 15:
                listData = [
                    { type: 'warning', content: 'This is warning event' },
                    { type: 'success', content: 'This is very long usual event。。....' },
                    { type: 'error', content: 'This is error event 1.' },
                    { type: 'error', content: 'This is error event 2.' },
                    { type: 'error', content: 'This is error event 3.' },
                    { type: 'error', content: 'This is error event 4.' },
                ];
                break;
            default:
        }
        return listData || [];
    };*/
    /*const dateCellRender = (value: Moment) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <Popover>
                        <button>sss</button>
                    <li key={item.content}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content} />
                    </li>
                    </Popover>
                ))}
            </ul>
        );
    };*/


    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };
    const handleCellClick = (event,date) => {
        event.stopPropagation();
        setOpen(!open);
        const rect = event.target.getBoundingClientRect();
        let resultLeftOffset;
        const bottomOffset = Math.floor(rect.top + window.scrollY);
        const lastDayOffset = (isCollapsedSider) ? 1050 : 920;
        const leftOffset = (isCollapsedSider) ? 189 : 169;
        const dayNumber = date.day();
        (dayNumber >= 1) ? resultLeftOffset = leftOffset*(dayNumber-1) : resultLeftOffset = lastDayOffset;
        dispatch(setPopoverOffset([resultLeftOffset, bottomOffset-138]));
    };
    return (
    <div className="calendar-wrapper" >
        {/*<button onClick={() => dispatch(getUserTrainings(token))}>get user trainings</button>
        <button onClick={() => dispatch(getAllTrainings(token))}>get all trainings list</button>*/}
        <Popover content={content}
                     title="Title"
                     trigger="click"
                     overlayInnerStyle={{
                         position: "absolute",
                         left: "0",
                         top: "100px",
                         borderRadius: '2px',
                         width: "264px",
                         height: "200px",
                         boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.15)",
                     }}
                     open={open}
                     align={{offset: popoverOffset}}
                     showArrow={false}
                     onOpenChange={handleOpenChange}>
            </Popover>
        <Calendar  locale={localeRU} mode="month"
                  dateCellRender={(date) => {
                    return (
                        <div className="cell-wrapper"
                             onClick={(e) => handleCellClick(e, date)}>
                        </div>
                    )
                }}
        />

    </div>
    );
};
