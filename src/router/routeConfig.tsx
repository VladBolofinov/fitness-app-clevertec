import {RouteProps} from "react-router-dom";
import {MainPageAsync} from "@pages/main/MainPage.async";
import {RequireAuth} from "./hoc/RequireAuth";
import {AuthPageAsync} from "@pages/auth/AuthPage.async";
import {FormWrapper} from "@pages/auth/FormWrapper/FormWrapper";
import {ResultMessage} from "@pages/auth/ResultMessage/ResultMessage";
import {ChangePassword} from "@pages/auth/ChangePassword/ChangePassword";
import {MessageTypeError, MessageTypeSuccess} from "@pages/auth/types/messageTypes";
import {FeedbackPage} from "@pages/feedback/FeedbackPage";
import {CalendarPage} from "@pages/calendar/CalendarPage";

export enum AppRoutes {
    ROOT = "/",
    MAIN = "/main",
    AUTH = "/auth",
    FEEDBACK = "/feedbacks",
    CALENDAR = "/calendar",
    REGISTRATION = "/auth/registration",
    ERROR_LOGIN = "/result/error-login",
    SUCCESS = "/result/success",
    ERROR_USER_EXIST = "/result/error-user-exist",
    ERROR = "/result/error",
    ERROR_CHECK_EMAIL_NO_EXIST = "/result/error-check-email-no-exist",
    ERROR_CHECK_EMAIL = "/result/error-check-email",
    CONFIRM_EMAIL = "/auth/confirm-email",
    CHANGE_PASSWORD = "/auth/change-password",
    ERROR_CHANGE_PASSWORD = "/result/error-change-password",
    SUCCESS_CHANGE_PASSWORD = "/result/success-change-password",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.ROOT]: "/",
    [AppRoutes.MAIN]: "/main",
    [AppRoutes.AUTH]: "/auth",
    [AppRoutes.FEEDBACK]: "/feedbacks",
    [AppRoutes.CALENDAR]: "/calendar",
    [AppRoutes.REGISTRATION]: "/auth/registration",
    [AppRoutes.ERROR_LOGIN]: "/result/error-login",
    [AppRoutes.SUCCESS]: "/result/success",
    [AppRoutes.ERROR_USER_EXIST]: "/result/error-user-exist",
    [AppRoutes.ERROR]: "/result/error",
    [AppRoutes.ERROR_CHECK_EMAIL_NO_EXIST]: "/result/error-check-email-no-exist",
    [AppRoutes.ERROR_CHECK_EMAIL]: "/result/error-check-email",
    [AppRoutes.CONFIRM_EMAIL]: "/auth/confirm-email",
    [AppRoutes.CHANGE_PASSWORD]: "/auth/change-password",
    [AppRoutes.ERROR_CHANGE_PASSWORD]: "/result/error-change-password",
    [AppRoutes.SUCCESS_CHANGE_PASSWORD]: "/result/success-change-password"
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.ROOT]: {
        path: RoutePath[AppRoutes.ROOT],
        element: <RequireAuth><MainPageAsync/></RequireAuth>,
        id: "none"
    },
    [AppRoutes.MAIN]: {
        path: RoutePath[AppRoutes.MAIN],
        element: <RequireAuth><MainPageAsync/></RequireAuth>,
        id: "none"
    },
    [AppRoutes.AUTH]: {
        path: RoutePath[AppRoutes.AUTH],
        element: <RequireAuth><AuthPageAsync><FormWrapper/></AuthPageAsync></RequireAuth>,
        id: "none"
    },
    [AppRoutes.FEEDBACK]: {
        path: RoutePath[AppRoutes.FEEDBACK],
        element: <RequireAuth><FeedbackPage/></RequireAuth>,
        id: "none"
    },
    [AppRoutes.CALENDAR]: {
        path: RoutePath[AppRoutes.CALENDAR],
        element: <CalendarPage/>,
        id: "none"
    },
    [AppRoutes.REGISTRATION]: {
        path: RoutePath[AppRoutes.REGISTRATION],
        element: <RequireAuth><AuthPageAsync><FormWrapper/></AuthPageAsync></RequireAuth>,
        id: "none"
    },
    [AppRoutes.ERROR_LOGIN]: {
        path: RoutePath[AppRoutes.ERROR_LOGIN],
        element: <AuthPageAsync><ResultMessage type={MessageTypeError.ERROR_LOGIN}/></AuthPageAsync>,
        id: "error"
    },
    [AppRoutes.SUCCESS]: {
        path: RoutePath[AppRoutes.SUCCESS],
        element: <AuthPageAsync><ResultMessage type={MessageTypeSuccess.SUCCESS}/></AuthPageAsync>,
        id: "success"
    },
    [AppRoutes.ERROR_USER_EXIST]: {
        path: RoutePath[AppRoutes.ERROR_USER_EXIST],
        element: <AuthPageAsync><ResultMessage type={MessageTypeError.ERROR_USER_EXIST}/></AuthPageAsync>,
        id: "error"
    },
    [AppRoutes.ERROR]: {
        path: RoutePath[AppRoutes.ERROR],
        element: <AuthPageAsync><ResultMessage type={MessageTypeError.ERROR}/></AuthPageAsync>,
        id: "error"
    },
    [AppRoutes.ERROR_CHECK_EMAIL_NO_EXIST]: {
        path: RoutePath[AppRoutes.ERROR_CHECK_EMAIL_NO_EXIST],
        element: <AuthPageAsync><ResultMessage type={MessageTypeError.ERROR_CHECK_EMAIL_NO_EXIST}/></AuthPageAsync>,
        id: "error"
    },
    [AppRoutes.ERROR_CHECK_EMAIL]: {
        path: RoutePath[AppRoutes.ERROR_CHECK_EMAIL],
        element: <AuthPageAsync><ResultMessage type={MessageTypeError.ERROR_CHECK_EMAIL}/></AuthPageAsync>,
        id: "error"
    },
    [AppRoutes.CONFIRM_EMAIL]: {
        path: RoutePath[AppRoutes.CONFIRM_EMAIL],
        element: <AuthPageAsync><ResultMessage type={MessageTypeSuccess.CONFIRM_EMAIL}/></AuthPageAsync>,
        id: "success"
    },
    [AppRoutes.CHANGE_PASSWORD]: {
        path: RoutePath[AppRoutes.CHANGE_PASSWORD],
        element: <AuthPageAsync><ChangePassword/></AuthPageAsync>,
        id: "error"
    },
    [AppRoutes.ERROR_CHANGE_PASSWORD]: {
        path: RoutePath[AppRoutes.ERROR_CHANGE_PASSWORD],
        element: <AuthPageAsync><ResultMessage type={MessageTypeError.ERROR_CHANGE_PASSWORD}/></AuthPageAsync>,
        id: "error"
    },
    [AppRoutes.SUCCESS_CHANGE_PASSWORD]: {
        path: RoutePath[AppRoutes.SUCCESS_CHANGE_PASSWORD],
        element: <AuthPageAsync><ResultMessage type={MessageTypeError.SUCCESS_CHANGE_PASSWORD}/></AuthPageAsync>,
        id: "error"
    },
};
