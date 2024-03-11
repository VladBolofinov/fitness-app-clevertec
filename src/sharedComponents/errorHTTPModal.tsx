import {Modal, Result} from "antd";
import {OnResultFuncType} from "./types/modalArgumentsTypes";

export const errorHTTPModal = (onOkFunc:OnResultFuncType) => {
    Modal.error({icon: null, centered: true, title: "", okText: "Назад",
        okButtonProps: {block:false},
        maskStyle: { backgroundColor: 'rgba(121, 156, 213, 0.5)', backdropFilter: "blur(5px)" },
        width: 539,
        onOk: onOkFunc,
        bodyStyle: {padding: "64px 32px 56px 32px"},
        content: <Result title="Что-то пошло не так" status="500"
        subTitle="Произошла ошибка.Попробуйте еще раз."
        />
    });
};
