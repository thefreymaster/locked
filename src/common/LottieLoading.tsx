import React from 'react';
import Lottie from 'react-lottie';
import bicycleAnimation from '../animations/bicycle.json'


const LottieLoading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: bicycleAnimation,
    };
    return (
        <div>
            <Lottie 
                options={defaultOptions}
                height={400}
                width={400}
            />
        </div>
    )
}

export default LottieLoading;