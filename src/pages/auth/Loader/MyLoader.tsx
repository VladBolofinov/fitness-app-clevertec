import React from "react";
import "./MyLoader.scss";
import Lottie from "lottie-react";
import loaderAnimation from "./loader-animation.json";

export const MyLoader:React.FC = () => (
        <div className="loader-wrapper">
            <div className="loader">
                <Lottie data-test-id="loader" animationData={loaderAnimation} loop={true} autoplay={true}/>
            </div>
        </div>
    );
