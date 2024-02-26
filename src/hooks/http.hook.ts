import axios from "axios";
import {history} from "@redux/configure-store";
export const useHttp = () => {
    const getToken = async (email:string, password:string, rememberUser:boolean|undefined) => {
        try {
            const response = await axios({
                method: 'post',
                url: 'https://marathon-api.clevertec.ru/auth/login',
                data: {
                    "email": email,
                    "password": password
                }
            })
            if (response.status === 200) {
                history.push('/main');
            }
            return {token: response.data.accessToken, inputCheck: rememberUser};
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status !== 200) {
                    history.push('/result/error-login');
                }
                return e.response?.status;
            }
        }
    }
    const registerNewUser = async (username : string, password: string) => {
        try {
            const response = await axios({
                method: 'post',
                url: 'https://marathon-api.clevertec.ru/auth/registration',
                data: {
                  'email' : username,
                  'password': password
                }
            })
            if (response.status === 201) {
                history.push('/result/success');
            }
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
                data: {
                    'email' : email,
                }
            })
            if (response.status === 200) {
                history.push('/auth/confirm-email');
            }
            return response.status;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 404) {
                    if (e.response.data.message === 'Email не найден') {
                        history.push('/result/error-check-email-no-exist');
                    }
                } else {
                    history.push('/result/error-check-email');
                }
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
                data: {
                    'email' : email,
                    'code': code
                }
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
                data: {
                    'password' : password,
                    'confirmPassword': confirmPassword,
                }
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
