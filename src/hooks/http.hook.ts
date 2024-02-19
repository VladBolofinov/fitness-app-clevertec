import axios from "axios";
import {history} from "@redux/configure-store";
export const useHttp = () => {
    const getToken = async (email, password, rememberUser) => {
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
                history.push('/main');
            }
            return {token: response.data.accessToken, inputCheck: rememberUser};
        } catch (e) {
            console.log(e.response.data);
            return e.response.status;
        }
    }


    const registerNewUser = async (username : string, password: string) => {
        try {
            const response = await axios({
                method: 'post',
                url: 'https://bookdatabasevb.onrender.com/register',
                data: {
                    username,
                    password
                }
            })
            console.log(response);
            return response.status;
        } catch (e) {
            throw e;
        }
    }

    return {
        getToken,
        registerNewUser
    }
}
