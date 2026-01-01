import React from 'react';
import { motion } from 'framer-motion';

const PlanetCard = ({ planet, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            style={{
                background: 'var(--glass)',
                border: '1px solid var(--glass-border)',
                borderRadius: '20px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                width: '240px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Decorative Glow */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: `radial-gradient(circle, ${planet.glowColor}22 0%, transparent 70%)`,
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            {/* Planet Circle Representation */}
            <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${planet.color}, #000)`,
                boxShadow: `0 0 20px ${planet.glowColor}66`, // glowing effect
                marginBottom: '15px',
                zIndex: 1,
                position: 'relative'
            }} className="animate-float" />

            <h2 style={{ zIndex: 1, margin: '5px 0' }}>{planet.name}</h2>
            <span style={{
                zIndex: 1,
                fontSize: '0.8rem',
                color: 'var(--primary)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}>{planet.type}</span>

            <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
                marginTop: '10px',
                zIndex: 1
            }}>
                {planet.englishName}
            </p>
        </motion.div>
    );
};

export default PlanetCard;
