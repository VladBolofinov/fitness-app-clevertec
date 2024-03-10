import React from "react";
import "./CalendarContent.scss";
import {Calendar} from "antd";
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Moment } from 'moment';
export const CalendarContent:React.FC = () => {
    const onPanelChange = (value: Moment, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    return (
    <div className="calendar-wrapper">
        <Calendar onPanelChange={onPanelChange} />
    </div>
    );
};

export default CalendarContent;
