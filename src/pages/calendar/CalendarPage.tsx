import React from "react";
import {CommonPage} from "@pages/commonPage/CommonPage";
import CalendarContent from "@pages/calendar/components/CalendarContent/CalendarContent";

export const CalendarPage:React.FC = () => {
    return (
        <CommonPage hasHeaderContent={false}>{{middle:<CalendarContent/>}}</CommonPage>
    );
};
