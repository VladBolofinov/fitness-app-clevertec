import axios from "axios";
import {history} from "@redux/configure-store";
import {FetchTokenFulfilledPayload} from "@redux/types/FetchTokenPayload";
import {AppRoutes} from "../router/routeConfig";
import {httpStatusVars} from "@redux/types/httpStatusVars";
import {httpMethods} from "@redux/types/httpStatusVars";
import {urls} from "@redux/types/httpStatusVars";
import {endpoints} from "@redux/types/httpStatusVars";
export const useHttp = () => {
    const getToken = async (email:string, password:string, rememberUser:boolean|undefined) => {
        try {
            const response = await axios({
                method: httpMethods.POST,
                url: `${urls.MAIN_URL}${endpoints.LOGIN}`,
                data: {email, password}
            })
            history.push(AppRoutes.MAIN);
            const resultData:FetchTokenFulfilledPayload = {token: response.data.accessToken, inputCheck: rememberUser}
            return resultData;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                history.push(AppRoutes.ERROR_LOGIN);
                return e.response?.status;
            }
        }
    }
    const registerNewUser = async (email : string, password: string) => {
        try {
            const response = await axios({
                method: httpMethods.POST,
                url: `${urls.MAIN_URL}${endpoints.REGISTRATION}`,
                data: {email, password}
            })
            history.push(AppRoutes.SUCCESS);
            return response.status;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                (e.response?.status === httpStatusVars["_409"]) ? history.push(AppRoutes.ERROR_USER_EXIST) : history.push(AppRoutes.ERROR);
                return e.response?.status;
            }
        }
    }
    const checkEmail = async (email : string) => {
        try {
            const response = await axios({
                method: httpMethods.POST,
                url: `${urls.MAIN_URL}${endpoints.CHECK_EMAIL}`,
                data: {email}
            })
            history.push(AppRoutes.CONFIRM_EMAIL);
            return response.status;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                    (e.response?.data.message === 'Email не найден')
                        ? history.push(AppRoutes.ERROR_CHECK_EMAIL_NO_EXIST)
                        : history.push(AppRoutes.ERROR_CHECK_EMAIL);
                return e.response?.status;
            }
        }
    }
    const confirmEmail = async (email : string, code: string) => {
        try {
            const response = await axios({
                method: httpMethods.POST,
                url: `${urls.MAIN_URL}${endpoints.CONFIRM_EMAIL}`,
                withCredentials: true,
                data: {email, code}
            })
            history.push(AppRoutes.CHANGE_PASSWORD);
            return response.status;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return e.response?.status;
            }
        }
    }
    const changePassword = async (password : string, confirmPassword: string) => {
        try {
            const response = await axios({
                method: httpMethods.POST,
                url: `${urls.MAIN_URL}${endpoints.CHANGE_PASSWORD}`,
                withCredentials: true,
                data: {password, confirmPassword,}
            })
            history.push(AppRoutes.SUCCESS_CHANGE_PASSWORD);
            return response.status;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                history.push(AppRoutes.ERROR_CHANGE_PASSWORD)
                return e.response?.status;
            }
        }
    }
    return {
        getToken,
        registerNewUser,
        checkEmail,
        confirmEmail,
        changePassword
    }
}
