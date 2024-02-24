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
            //console.log(response);
            if (response.status === 200) {
                history.push('/main');
            }
            return {token: response.data.accessToken, inputCheck: rememberUser};
        } catch (e) {
            //console.log('сработал блок catch')
            //console.log(e);
            //console.log(e.response.data.statusCode);
            if (e.response.status !== 200) {
                history.push('/result/error-login');
            }
            return e.response.status;
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
            console.log(response);
            if (response.status === 201) {
                history.push('/result/success');
            }

            return response.status;
        } catch (e) {
            console.log('срaботал блок кэтч')
            if (e.response.status === 409) {
                history.push('/result/error-user-exist');
            } else {
                history.push('/result/error');
            }
            return e.response.status;
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
            console.log(response);
            if (response.status === 200) {
                history.push('/auth/confirm-email');
            }

            return response.status;
        } catch (e) {
            console.log('срaботал блок кэтч')
            console.log(e.response);
            if (e.response.status === 404 && e.response.data.message === 'Email не найден') {
                history.push(' /result/error-check-email-no-exist');
            }
            else if (e.response.status === 404 && e.response.data.message !== 'Email не найден') {
                history.push('/result/error-check-email');
            } else {
                history.push('/result/error-check-email');
            }
            return e.response.status;
        }
    }

    return {
        getToken,
        registerNewUser,
        checkEmail
    }
}
