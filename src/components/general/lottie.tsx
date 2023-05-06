import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';

type lottieProps = {
    animationData: any
    loop: boolean
    autoplay: boolean
    speed: number
};

const MyAnimation: React.FC<lottieProps> = ({ animationData, loop, autoplay, speed }) => {
    const containerRef = useRef(null);



    useEffect(() => {
        Lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: loop,
            autoplay: autoplay,
            animationData: animationData,
        }
        ).setSpeed(speed);
    }, []);

    return (
        <div ref={containerRef}></div>
    );
}

export default MyAnimation;
