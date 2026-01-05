import { useState, useEffect } from 'react';
import { soundEffects } from '../utils/soundEffects';

export const useCountdown = (onComplete) => {
    const [countdown, setCountdown] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const start = () => {
        setIsActive(true);
        setCountdown(3);
        soundEffects.init(); // Initialize audio context
    };

    useEffect(() => {
        if (!isActive) return;

        if (countdown === null) return;

        if (countdown === 0) {
            setCountdown('GO!');
            soundEffects.playGoSound(); // Play GO! sound
            setTimeout(() => {
                setCountdown(null);
                setIsActive(false);
                onComplete();
            }, 800);
            return;
        }

        // Play beep for countdown numbers
        soundEffects.playCountdownBeep();

        const timer = setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, isActive, onComplete]);

    return { countdown, start, isActive };
};
