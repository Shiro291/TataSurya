import { useState, useEffect, useRef } from 'react';

export const useAudio = (url) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3); // 30% default

    useEffect(() => {
        audioRef.current = new Audio(url);
        audioRef.current.loop = true;
        audioRef.current.volume = volume;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [url]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const toggle = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
        setIsPlaying(!isPlaying);
    };

    return { isPlaying, volume, setVolume, toggle };
};
