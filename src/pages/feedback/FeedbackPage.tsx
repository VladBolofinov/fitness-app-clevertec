import React from 'react';
import {CommonPage} from "@pages/commonPage/CommonPage";

export const FeedbackPage:React.FC = () => {
    return (
        <CommonPage hasHeaderContent={false}>
            {{
                middle: <div>Какой-то контент в середине страницы фидбэк</div>,
            }}
        </CommonPage>
    );
};
