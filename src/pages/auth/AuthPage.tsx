import React, {useEffect} from 'react';
import './AuthPage.scss';
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks";
import {apiRequestSlice, fetchToken} from "@redux/reducers/apiRequestSlice";
import {history} from "@redux/configure-store";

export const AuthPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { setInputPasswordValue, setInputLoginValue} = apiRequestSlice.actions;
    const {inputLoginValue, inputPasswordValue} = useAppSelector(state => state.apiRequestSlice);
    return (
        <div className='auth-wrapper'>
            <div className="entry-form">
                <input type="text" placeholder='login' onChange={(e) => dispatch(setInputLoginValue(e.target.value))}/>
                <input type="password" placeholder='password' onChange={(e) => dispatch(setInputPasswordValue(e.target.value))}/>
                <input type="checkbox"/>
                <button onClick={() => dispatch(fetchToken({email:inputLoginValue, password:inputPasswordValue}))}>log in</button>
                <button onClick={()=>history.push('/result')}>redirect</button>
            </div>
        </div>
    );
};
