import React, {useState} from 'react';
import "./PopoverComponent.scss";
import {CloseOutlined, EditTwoTone} from "@ant-design/icons";
import {Badge, Button, Empty, Popover, Select} from "antd";
import {badgeColors} from "@pages/calendar/constants/badgeColors";
import {useSelector} from "react-redux";
import {getPopoverOffset} from "@redux/selectors/getCalendarState/getPopoverOffset/getPopoverOffset";
import {getCurrentDate} from "@redux/selectors/getCalendarState/getCurrentDate/getCurrentDate";
import {getCurrentDateUserTrainings} from "@redux/selectors/getCalendarState/getCurrentDateUserTrainings/getCurrentDateUserTrainings";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks";
import {calendarSlice} from "@redux/reducers/calendarSlice";
import {getIsPopoverOpen} from "@redux/selectors/getCalendarState/getIsPopoverOpen/getIsPopoverOpen";

export const PopoverComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const popoverOffset = useSelector(getPopoverOffset);
    const isPopoverOpen = useSelector(getIsPopoverOpen);
    const currentDate = useSelector(getCurrentDate);
    const currentDateUserTrainings = useSelector(getCurrentDateUserTrainings);
    const {setIsPopoverOpen} = calendarSlice.actions;

    const renderUserListTraining = currentDateUserTrainings.map((item) => {
        return (
            <div className="popover-middle-content">
                <Badge color={badgeColors[item.name]} text={item.name}/>
                <EditTwoTone twoToneColor={["var(--primary-light-6)", "white"]}
                             style={{cursor: "pointer", fontSize: "16px"}}/>
            </div>
        )
    })
    const content = (
        <>
            {(renderUserListTraining.length)
                ? renderUserListTraining
                : <>
                    <span className="popover-subtitle">Нет активных тренировок</span>
                <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                description={null}
                style={{margin: "32px 0 28px 0"}}
                imageStyle={{height: 32}}/>
                </>
                }
            <div className="popover-btn-wrapper">
                <Button type="primary" block>{renderUserListTraining.length ? "Добавить" : "Создать"} тренировку</Button>
            </div>
        </>
    )
    const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    const titleContent = () => (
        <>
            {/*<Select
                mode="multiple"
                placeholder="Inserted are removed"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{ width: '100%' }}
                options={filteredOptions.map(item => ({
                    value: item,
                    label: item,
                }))}
            />*/}
            <span className="popover-title-header">{`Тренировки на ${currentDate}`}</span>
            <CloseOutlined onClick={hide} style={{cursor: "pointer"}}/>
        </>
    )

    const handleOpenChange = (newOpen: boolean) => {
        //если будет открыт drawer то это событие не работает
        dispatch(setIsPopoverOpen(newOpen));
    };
    const hide = () => {
        dispatch(setIsPopoverOpen(false));
    };
    return (
        <Popover content={content}
                 title={titleContent}
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
