import axios from "axios";
import {history} from "@redux/configure-store";
import {FetchTokenFulfilledPayload} from "@redux/types/FetchTokenPayload";
export const useHttp = () => {
    const getToken = async (email:string, password:string, rememberUser:boolean|undefined) => {
        try {
            const response = await axios({
                method: 'post',
                url: 'https://marathon-api.clevertec.ru/auth/login',
                data: {email, password}
            })
            history.push('/main');
            const resultData:FetchTokenFulfilledPayload = {token: response.data.accessToken, inputCheck: rememberUser}
            return resultData;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                history.push('/result/error-login');
                return e.response?.status;
            }
        }
    }
    const registerNewUser = async (email : string, password: string) => {
        try {
            const response = await axios({
                method: 'post',
                url: 'https://marathon-api.clevertec.ru/auth/registration',
                data: {email, password}
            })
            history.push('/result/success');
            return response.status;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                (e.response?.status === 409) ? history.push('/result/error-user-exist') : history.push('/result/error');
                return e.response?.status;
            }
        }
    }
    const checkEmail = async (email : string) => {
        try {
            const response = await axios({
                method: 'post',
                url: 'https://marathon-api.clevertec.ru/auth/check-email',
                data: {email}
            })
            history.push('/auth/confirm-email');
            return response.status;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                    (e.response?.data.message === 'Email не найден')
                        ? history.push('/result/error-check-email-no-exist')
                        : history.push('/result/error-check-email');
                return e.response?.status;
            }
        }
    }
    const confirmEmail = async (email : string, code: string) => {
        try {
            const response = await axios({
                method: 'post',
                url: 'https://marathon-api.clevertec.ru/auth/confirm-email',
                withCredentials: true,
                data: {email, code}
            })
            history.push('/auth/change-password');
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
                method: 'post',
                url: 'https://marathon-api.clevertec.ru/auth/change-password',
                withCredentials: true,
                data: {password, confirmPassword,}
            })
            history.push('/result/success-change-password');
            return response.status;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                history.push('/result/error-change-password')
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
