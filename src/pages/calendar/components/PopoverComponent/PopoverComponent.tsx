import React, {useEffect, useState} from 'react';
import "./PopoverComponent.scss";
import {ArrowLeftOutlined, CloseOutlined, EditTwoTone} from "@ant-design/icons";
import {Badge, Button, Empty, Popover, Select} from "antd";
import {badgeColors} from "@pages/calendar/constants/badgeColors";
import {useSelector} from "react-redux";
import {getPopoverOffset} from "@redux/selectors/getCalendarState/getPopoverOffset/getPopoverOffset";
import {getCurrentDate} from "@redux/selectors/getCalendarState/getCurrentDate/getCurrentDate";
import {getCurrentDateUserTrainings} from "@redux/selectors/getCalendarState/getCurrentDateUserTrainings/getCurrentDateUserTrainings";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {calendarSlice} from "@redux/reducers/calendarSlice";
import {getIsPopoverOpen} from "@redux/selectors/getCalendarState/getIsPopoverOpen/getIsPopoverOpen";
import {getTrainingList} from "@redux/selectors/getCalendarState/getTrainingList/getTrainingList";
import moment from "moment";
import {
    getIsNextStepModal
} from "@redux/selectors/getCalendarState/getIsNextStepModal/getIsNextStepModal";
import {selectOptionValues} from "@pages/calendar/helpers/selectOptionValues";
import {
    getCurrentSelectValue
} from "@redux/selectors/getCalendarState/getCurrentSelectValue/getCurrentSelectValue";
import {getIsOpenDrawer} from "@redux/selectors/getCalendarState/getIsOpenDrawer/getIsOpenDrawer";
export const PopoverComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const popoverOffset = useSelector(getPopoverOffset);
    const isPopoverOpen = useSelector(getIsPopoverOpen);
    const trainingList = useSelector(getTrainingList);
    const currentDate = useSelector(getCurrentDate);
    const isNextStepModal = useSelector(getIsNextStepModal);
    const currentDateUserTrainings = useSelector(getCurrentDateUserTrainings);
    const isOpenDrawer = useSelector(getIsOpenDrawer);
    const currentSelectValue = useSelector(getCurrentSelectValue);
    const {setIsPopoverOpen, setIsNextStepModal,setCurrentSelectValue,setCurrentTrainingExercises,setIsOpenDrawer} = calendarSlice.actions;
    const isBtnDisabled = (moment(currentDate, 'DD.MM.YYYY').isSame(moment(), 'day') //вынеси в отдельную переменную формат даты
        || moment(currentDate, 'DD.MM.YYYY').isBefore(moment())) ? true : false || currentDateUserTrainings.length >= 5;

    const renderUserListTraining = currentDateUserTrainings.map((item) => {
        return (
            <div className="popover-middle-content">
                <Badge color={badgeColors[item.name]} text={item.name}/>
                <EditTwoTone twoToneColor={["var(--primary-light-6)", "white"]}
                             style={{cursor: "pointer", fontSize: "16px"}}/>
            </div>
        )
    })
    const secondStepModalContent = (
        <>
            {(currentSelectValue) //&& length exercise
                ? null //array exercise value
                : <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" //это тоже вынеси там где апи url
                        description={null}
                        style={{margin: "32px 0 28px 0"}}
                        imageStyle={{height: 32}}/>
            }
            <div className="popover-btn-wrapper">
                <Button disabled={(currentSelectValue) ? false : true } style={{height: "32px"}} type="default" block
                        onClick={() => {dispatch(setIsOpenDrawer(true))}}>
                    Добавить упражнения
                </Button>
                <Button onClick={() => {dispatch(setCurrentTrainingExercises())}} style={{height: "32px"}} type="link" block>
                    Сохранить
                </Button>
            </div>
        </>
    )
    const firstStepModalContent = (
        <>
            {(renderUserListTraining.length)
                ? renderUserListTraining
                : <>
                    <span className="popover-subtitle">Нет активных тренировок</span>
                <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" //это тоже вынеси там где апи url
                description={null}
                style={{margin: "32px 0 28px 0"}}
                imageStyle={{height: 32}}/>
                </>
                }
            <div className="popover-btn-wrapper">
                <Button disabled={isBtnDisabled} type="primary" block
                        onClick={() => dispatch(setIsNextStepModal(true))}>{renderUserListTraining.length ? "Добавить" : "Создать"} тренировку</Button>
            </div>
        </>
    )
    const secondStepTitleContent = () => (
        <>
            <ArrowLeftOutlined style={{cursor: "pointer"}} onClick={() => dispatch(setIsNextStepModal(false))}/>
            <Select
                placeholder="Выбор типа тренировки"
                //value={selectedItems}
                //onChange={setSelectedItems}
                //notFoundContent={null}
                onChange={(value, option) => {
                    dispatch(setCurrentSelectValue(option.label));
                }}
                bordered={false}
                style={{ width: '100%' }}
                options={selectOptionValues(currentDateUserTrainings, trainingList)}
            />
        </>
    )
    const firstStepTitleContent = () => (
        <>
           <span className="popover-title-header">
               {`Тренировки на ${currentDate.split('-').join('.')}`}
           </span>
            <CloseOutlined onClick={hide} style={{cursor: "pointer"}}/>
        </>
    )

    const handleOpenChange = (newOpen: boolean) => {
        //если будет открыт drawer то это событие не работает
        if (!isOpenDrawer) {
            dispatch(setIsPopoverOpen(newOpen));
        }
    };
    const hide = () => {
        dispatch(setIsPopoverOpen(false));
    };
    return (
        <Popover content={(isNextStepModal) ? secondStepModalContent : firstStepModalContent}
                 title={(isNextStepModal) ? secondStepTitleContent : firstStepTitleContent}
                 trigger="click"
                 overlayInnerStyle={{
                     position: "absolute",
                     left: "0",
                     top: "100px",
                     borderRadius: '2px',
                     width: "264px",
                     boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.15)",
                 }}
                 open={isPopoverOpen}
                 align={{offset: popoverOffset}}
                 showArrow={false}
                 onOpenChange={handleOpenChange}
        >
        </Popover>
    )
};
