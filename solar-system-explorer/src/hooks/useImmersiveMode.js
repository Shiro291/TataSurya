import { useState, useEffect } from 'react';

export const useImmersiveMode = () => {
    const [isEnabled, setIsEnabled] = useState(() => {
        const saved = localStorage.getItem('immersive_mode');
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('immersive_mode', JSON.stringify(isEnabled));
    }, [isEnabled]);

    const toggle = () => setIsEnabled(!isEnabled);

    return { isEnabled, toggle };
};
