import React from 'react';
import { motion } from 'framer-motion';

const PlanetOverview = ({ planet, details }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--primary)' }}>
                {planet.name}
            </h2>
            <div style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '20px' }}>
                {planet.type}
            </div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                    src={planet.imgUrl}
                    alt={planet.name}
                    style={{
                        width: '100%',
                        maxWidth: '300px',
                        borderRadius: '15px',
                        boxShadow: `0 0 20px ${planet.glowColor || 'rgba(255,255,255,0.2)'}`
                    }}
                />
            </div>

            <p style={{ lineHeight: '1.6', fontSize: '1rem', marginBottom: '20px' }}>
                {details.description}
            </p>

            {/* Quick Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                background: 'rgba(255,255,255,0.05)',
                padding: '15px',
                borderRadius: '15px'
            }}>
                <div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>Suhu</div>
                    <div style={{ fontSize: '1.1rem' }}>{details.stats.temp}°C</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>Gravitasi</div>
                    <div style={{ fontSize: '1.1rem' }}>{details.stats.gravity} m/s²</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>Bulan</div>
                    <div style={{ fontSize: '1.1rem' }}>{details.stats.moons}</div>
                </div>
                <div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>Jarak</div>
                    <div style={{ fontSize: '1.1rem' }}>{details.stats.distance} Juta km</div>
                </div>
            </div>
        </motion.div>
    );
};

export default PlanetOverview;
