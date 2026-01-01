import React, { useState } from 'react';
import { useAudio } from '../hooks/useAudio';

const AudioControl = () => {
    const { isPlaying, volume, setVolume, toggle } = useAudio('https://incompetech.com/music/royalty-free/mp3-royaltyfree/Space%20Jazz.mp3');
    const [showVolume, setShowVolume] = useState(false);

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(0,0,0,0.5)',
            padding: '10px',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
        }}>
            {showVolume && (
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    style={{
                        width: '100px',
                        cursor: 'pointer'
                    }}
                />
            )}
            <button
                onClick={() => setShowVolume(!showVolume)}
                style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                title="Volume"
            >
                {volume === 0 ? '🔇' : '🔊'}
            </button>
            <button
                onClick={toggle}
                style={{
                    background: isPlaying ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                    color: isPlaying ? '#000' : '#fff',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                title={isPlaying ? 'Pause Music' : 'Play Music'}
            >
                {isPlaying ? '⏸️' : '▶️'}
            </button>
        </div>
    );
};

export default AudioControl;
