import React from 'react';
import {CommonPage} from "@pages/commonPage/CommonPage";
import {FeedbackContent} from "@pages/feedback/components/FeedbackContent";

export const FeedbackPage:React.FC = () => {
    return (
        <CommonPage hasHeaderContent={false}>
            {{
                middle: <FeedbackContent/>,
            }}
        </CommonPage>
    );
};
