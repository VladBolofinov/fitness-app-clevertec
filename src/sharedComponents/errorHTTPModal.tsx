import {Button, Modal, Result} from "antd";
import {OnResultFuncType} from "./types/modalArgumentsTypes";

export const errorHTTPModal = (onOkFunc:OnResultFuncType) => {
    Modal.error({icon: null, centered: true,
        maskStyle: { backgroundColor: 'rgba(121, 156, 213, 0.5)', backdropFilter: "blur(5px)" },
        width: 539,
        wrapClassName: "errorHTTPModal-wrapper",
        bodyStyle: {padding: "64px 32px 56px 32px"},
        content: <div data-test-id ="modal-no-review">
            <Result
                title="Что-то пошло не так" status="500"
                subTitle="Произошла ошибка, попробуйте ещё раз."
                extra={
                    <Button type="primary" key="console" block={false} onClick={() => {
                        onOkFunc();
                        Modal.destroyAll();
                    }}>Назад</Button>
                }
            />
        </div>
    });
};
