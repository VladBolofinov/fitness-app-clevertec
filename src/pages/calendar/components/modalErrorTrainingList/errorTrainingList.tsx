import {Modal} from "antd";
import {OnResultFuncType} from "../../../../sharedComponents/types/modalArgumentsTypes";
import {CloseOutlined} from "@ant-design/icons";

export const errorTrainingList = (onOkFunc:OnResultFuncType) => {
    Modal.error({
        bodyStyle: {padding: "16px 24px"},
        maskStyle: { backgroundColor: 'rgba(121, 156, 212, 0.1)', backdropFilter: "blur(5px)" },
        title: <span data-test-id="modal-error-user-training-title">При открытии данных произошла ошибка</span>,
        closable: true,
        closeIcon: <CloseOutlined data-test-id='modal-error-user-training-button-close'/>,
        width: 384,
        content: <span data-test-id="modal-error-user-training-subtitle">Попробуйте ещё раз.</span>,
        okText: "Обновить",
        onOk: onOkFunc,
        centered: true,
        wrapClassName: "error-training-list-modal-wrapper",
        okButtonProps: {style: {height: "28px", width: "99px", padding: "0", marginTop: "8px"},
            "data-test-id": 'modal-error-user-training-button'
        }
    });
};
