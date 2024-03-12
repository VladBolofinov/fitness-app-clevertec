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

export const CalendarContent:React.FC = () => {
    const dispatch = useAppDispatch();
    const token = useSelector(getToken);
    const isErrorTrainingList = useSelector(getIsErrorTrainingList);
    const {clearIsErrorTrainingList} = calendarSlice.actions;
    moment.locale("ru_RU", {week: {dow: 1}});

    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
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
            <button onClick={hide}>Close</button>
        </div> )
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };
    useEffect(() => {
        if (isErrorTrainingList) {
            errorTrainingList(repeatGetTrainingList);
        }
    },[isErrorTrainingList])
    return (
    <div className="calendar-wrapper" >
        <button onClick={() => dispatch(getUserTrainings(token))}>get user trainings</button>
        <button onClick={() => dispatch(getAllTrainings(token))}>get all trainings list</button>
        <Calendar locale={localeRU} dateCellRender={(date) => {
            if (new Date(date).getDate() === 15) {
                return (<Popover content={content}
                                 title="Title"
                                 trigger="click"
                                 overlayInnerStyle={{
                                     borderRadius: '2px',
                                     width: "264px",
                                     height: "270px",
                                     boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.15)",
                }}
                                 open={open}
                                 align={{
                                     offset: [-8, 255],
                                 }}
                                 showArrow={false}
                                 onOpenChange={handleOpenChange}
                placement="topLeft">
                    <button>AAA</button>
                </Popover>)
            } else {
                return false;
            }
        }}/>
        <Popover>
            <Button type="primary">Click me</Button>
        </Popover>
    </div>
    );
};
