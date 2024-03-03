import React from 'react';
import {CommonPage} from "@pages/commonPage/CommonPage";
import {FeedbackContent} from "@pages/feedback/components/feedbackContent/FeedbackContent";
import {useSelector} from "react-redux";
import {getIsEmptyFeedbacksDB} from "@redux/selectors/getApiRequestState/getIsEmptyFeedbacksDB/getIsEmptyFeedbacksDB";
import {NotFindFeedbacks} from "@pages/feedback/components/notFindFeedbacks/NotFindFeedbacks";

export const FeedbackPage:React.FC = () => {
    const isEmptyFeedbacksDB = useSelector(getIsEmptyFeedbacksDB);
    return (
        <CommonPage hasHeaderContent={false}>
            {{
                middle: (isEmptyFeedbacksDB) ? <NotFindFeedbacks/> : <FeedbackContent/>,
            }}
        </CommonPage>
    );
};
