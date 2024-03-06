import React from "react";
import {CommonPage} from "@pages/commonPage/CommonPage";
import {FeedbackContent} from "@pages/feedback/components/feedbackContent/FeedbackContent";

export const FeedbackPage:React.FC = () => (
        <CommonPage hasHeaderContent={false}>{{middle:<FeedbackContent/>}}</CommonPage>
);
