import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const ImmersiveModeToggle = ({ isEnabled, onToggle }) => {
    const isMobile = useIsMobile();

    return (
        <button
            onClick={onToggle}
            style={{
                position: 'fixed',
                top: isMobile ? '70px' : '90px',
                right: isMobile ? '10px' : '20px',
                zIndex: 150,
                padding: isMobile ? '8px 12px' : '10px 15px',
                borderRadius: '20px',
                background: isEnabled ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                color: isEnabled ? '#000' : '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: isEnabled ? '0 0 20px var(--primary)66' : 'none',
                transition: 'all 0.3s'
            }}
            title={isEnabled ? 'Disable Immersive Mode' : 'Enable Immersive Mode'}
        >
            <span>🎬</span>
            <span>{isMobile ? 'Immersive' : 'Immersive Mode'}</span>
        </button>
    );
};

export default ImmersiveModeToggle;
