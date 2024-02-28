import {ReactNode} from "react";

export interface IResultMessageData {
    [key: string]: {
        headerMessage: string;
        descrMessage: string | ReactNode;
        btnText: string;
        status: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500' | undefined,
        classname: 'error-message-modal warning' | 'error-message-modal' | 'error-message-modal big',
        btnWidth: string;
        btnClickEvent?: () => void;
        dataTestId: string;
    };
}
