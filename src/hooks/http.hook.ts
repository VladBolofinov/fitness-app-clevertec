import axios from "axios";
import {history} from "@redux/configure-store";
import {FetchTokenFulfilledPayload} from "@redux/types/FetchTokenPayload";
import {AppRoutes} from "../router/routeConfig";
import {httpStatusVars} from "@redux/types/httpStatusVars";
import {httpMethods} from "@redux/types/httpStatusVars";
import {urls} from "@redux/types/httpStatusVars";
import {endpoints} from "@redux/types/httpStatusVars";
import {warningModal} from "@pages/feedback/components/feedbackContent/FeedbackContent";
export const useHttp = () => {
    const authenticateUser = async (email:string, password:string, rememberUser:boolean|undefined) => {
        try {
            const response = await axios({
                method: httpMethods.POST,
                url: `${urls.MAIN_URL}${endpoints.LOGIN}`,
                data: {email, password}
            })
            const resultData:FetchTokenFulfilledPayload = {token: response.data.accessToken, rememberUser};
            (resultData.token) ? history.push(AppRoutes.MAIN) : history.push(AppRoutes.AUTH);
            return resultData;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                history.push(AppRoutes.ERROR_LOGIN);
                return e.response?.status;
            }
        }
    }
    const googleAuthenticateUser = async () => {
        try {
            const response = await axios({
                method: httpMethods.GET,
                url: `${urls.MAIN_URL}${endpoints.GOOGLE}`,
            })
            return response.status;
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
    const getFeedbacks = async (token:string) => {
        try {
            const response = await axios({
                method: httpMethods.GET,
                url: `${urls.MAIN_URL}${endpoints.FEEDBACK}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            history.push(AppRoutes.FEEDBACK);
            console.log(response.data);
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === httpStatusVars["_403"]) {
                    localStorage.clear();
                    history.push(AppRoutes.AUTH);
                }
                //return e.response;
            }
        }
    }
    const sendFeedback = async (token:string, message: string, rating: number) => {
        try {
            const response = await axios({
                method: httpMethods.POST,
                url: `${urls.MAIN_URL}${endpoints.FEEDBACK}`,
                data: {
                    message,
                    rating
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response);
            return response.data.status;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.status);
                return e.response?.status;
            }
        }
    }
    return {
        authenticateUser,
        googleAuthenticateUser,
        registerNewUser,
        checkEmail,
        confirmEmail,
        changePassword,
        getFeedbacks,
        sendFeedback
    }
}
