import React from 'react';
import Lottie from "lottie-react";
import loaderAnimation from './loader-animation.json';
import './MyLoader.scss';
export const MyLoader:React.FC = () => {
    return (
        <div className='loader-wrapper'>
            <div className='loader'>
                <Lottie data-test-id='loader' animationData={loaderAnimation} loop={true} autoplay={true}/>
            </div>
        </div>
    );
};
