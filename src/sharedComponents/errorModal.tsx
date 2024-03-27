import {Modal, Result} from "antd";
import {OnResultFuncType} from "./types/modalArgumentsTypes";

export const errorModal = (onOkFunc:OnResultFuncType, onCancelFunc: OnResultFuncType) => {
    Modal.confirm({icon: null, centered: true, title: "", cancelText: "Написать отзыв",
        onCancel: onCancelFunc,
        cancelButtonProps: {block: true, type: "primary"},
        okText: "Закрыть", onOk: onOkFunc, okButtonProps: {block:true, type: "default"},
        maskStyle: { backgroundColor: "rgba(121, 156, 213, 0.5)", backdropFilter: "blur(5px)" }, width: 539,
        content: <Result
            status="error"
            title="Данные не сохранились"
            subTitle="Что-то пошло не так. Попробуйте еще раз."
        />
    });
};
