import React from "react";
import "./TriggerBtn.scss";
import {
    BtnIconCollapsedLg,
    BtnIconCollapsedSm, BtnIconNotCollapsedLg,
    BtnIconNotCollapsedSm
} from "@pages/main/components/customSvgIcons/customSvgIcons";
import {Grid} from "antd";
import {authSlice} from "@redux/reducers/authSlice";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {useSelector} from "react-redux";
import {getIsCollapseSider} from "@redux/selectors/getApiRequestState/getIsCollapseSider/getIsCollapseSider";
const { useBreakpoint } = Grid;
export const TriggerBtn:React.FC = () => {
    const screens = useBreakpoint();
    const {setIsCollapseSider} = authSlice.actions;
    const dispatch = useAppDispatch();
    const isCollapseSider = useSelector(getIsCollapseSider);
    return (
            <button
                data-test-id={screens.xs ? "sider-switch-mobile" : "sider-switch"}
                className={isCollapseSider ? "btn-trigger-collapsed" : "btn-trigger"}
                onClick={() =>dispatch(setIsCollapseSider())}>
                {screens.xs ? (
                    isCollapseSider ? <BtnIconNotCollapsedSm /> : <BtnIconCollapsedSm />
                ) : (
                    isCollapseSider ? <BtnIconNotCollapsedLg /> : <BtnIconCollapsedLg />
                )}
            </button>
    );
};
