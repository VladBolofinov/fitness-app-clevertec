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
            console.log(response);
            if (response.status === 200) {
                history.push('/');
            }
            return {token: response.data.accessToken, inputCheck: rememberUser};
        } catch (e) {
            console.log(e.response);
            //if (e.response.status !== 200) {
                history.push('/result/error-login');
            //}
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
            history.push('/result/success');
            return response.status;
        } catch (e) {
            if (e.response.status === 409) {
                history.push('/result/error-user-exist');
            }
        }
    }

    return {
        getToken,
        registerNewUser
    }
}
