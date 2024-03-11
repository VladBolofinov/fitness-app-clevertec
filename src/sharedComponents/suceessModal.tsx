import {Modal, Result} from "antd";
import {OnResultFuncType} from "./types/modalArgumentsTypes";
export const successModal = (onOkFunc:OnResultFuncType) => {
    Modal.success({icon: null, centered: true, title: "", okText: "Отлично", onOk: onOkFunc, okButtonProps: {block:true},
        maskStyle: { backgroundColor: "rgba(121, 156, 213, 0.5)", backdropFilter: "blur(5px)" }, width: 539,
        content: <Result status="success" title="Отзыв успешно опубликован"/>
    });
};
