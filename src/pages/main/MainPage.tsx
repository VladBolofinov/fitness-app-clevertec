import React from 'react';
import {HeaderContent} from "@pages/main/components/HeaderContent/HeaderContent";
import {MiddleContent} from "@pages/main/components/MiddleContent/MiddleContent";
import {FooterContent} from "@pages/main/components/FooterContent/FooterContent";
import {useSelector} from "react-redux";
import {
    getIsCollapseSider
} from "@redux/selectors/getApiRequestState/getIsCollapseSider/getIsCollapseSider";
import {CommonPage} from "@pages/commonPage/CommonPage";

const MainPage: React.FC = () => {
    const isCollapseSider = useSelector(getIsCollapseSider);

    return (
        <CommonPage hasHeaderContent={true}>
            {{
                header: <HeaderContent />,
                middle: <MiddleContent collapsed={isCollapseSider} />,
                footer: <FooterContent collapsed={isCollapseSider} />
            }}
        </CommonPage>
    );
};

export default MainPage;
